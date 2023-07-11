const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const tokenTypes = require('../config/tokens');

const Schema = mongoose.Schema;

const tokenSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
            index: true,
        },
        tokenType: {
            type: String,
            // required: true,
        },
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
        expires: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
