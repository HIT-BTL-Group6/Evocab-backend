const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const Schema = mongoose.Schema;

const questionSchema = new Schema(
    {
        topic: {
            type: Schema.Types.ObjectId,
            ref: 'Topic',
            required: [true, 'Please provide the topic!'],
        },
        question: {
            hint: {
                type: String,
                default: null,
            },
            example_hint: {
                type: String,
                default: null,
            },
        },
        answer: {
            word_correct: {
                type: Schema.Types.ObjectId,
                ref: 'Word',
                required: [true, 'Please provide the word_correct!'],
            },
            choices: [
                {
                    type: String,
                },
            ],
        },
    },
    {
        timestamps: true,
    }
);

questionSchema.plugin(toJSON);
questionSchema.plugin(paginate);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
