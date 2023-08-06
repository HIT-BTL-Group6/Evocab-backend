const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const Schema = mongoose.Schema;

const examSchema = new Schema(
    {
        examName: {
            type: String,
            default: 'Bài kiểm tra',
        },
        questions: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Question',
                required: [true, 'Please provide the questionId!'],
            },
        ],
    },
    {
        timestamps: true,
    }
);

examSchema.plugin(toJSON);
examSchema.plugin(paginate);

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
