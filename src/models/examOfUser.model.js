const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const Schema = mongoose.Schema;

const examOfUserSchema = new Schema(
    {
        exam: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Exam',
            required: true,
        },
        user_id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
        resutl: {
            type: Number,
            default: 0,
        },
        time: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
examOfUserSchema.plugin(toJSON);

examOfUserSchema.plugin(paginate);

const ExamOfUser = mongoose.model('ExamOfUser', examOfUserSchema);

module.exports = ExamOfUser;
