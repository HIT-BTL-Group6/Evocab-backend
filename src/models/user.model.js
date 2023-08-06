const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Please provide your username!'],
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please provide your password!'],
            trim: true,
            minlength: 8,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('Password must contain at least one letter and one number');
                }
            },
            private: true, // used by the toJSON plugin
            select: false,
        },
        //  passwordConfirm:,
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            },
        },
        emailToken: {
            type: String,
        },
        emailExpires: {
            type: Date,
        },
        age: Number,
        fullname: {
            type: String,
            max: 100,
        },
        avatar: {
            type: String,
            max: 256,
        },
        gender: {
            type: String,
            enum: ['male', 'female'],
        },
        bio: {
            type: String,
            max: 500,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'admin',
        },
        topicId: {
            type: Schema.Types.ObjectId,
            ref: 'Topic',
            default: null,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        isEmailVerified: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

/**
 * Check if username is taken
 * @param {string} username - The user's username
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
    const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
    return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
    try {
        const user = this;
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 7);
        }
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
