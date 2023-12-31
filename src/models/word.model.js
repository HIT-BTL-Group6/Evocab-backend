const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const Schema = mongoose.Schema;

const wordSchema = new Schema(
    {
        word: {
            type: String,
            required: [true, 'Please provide the word!'],
            trim: true,
        },
        example: {
            type: String,
            required: [true, 'Please provide an example!'],
            trim: true,
        },
        sound: {
            type: String,
            required: [true, 'Please provide the sound!'],
            trim: true,
        },
        pronunciation: {
            type: String,
            required: [true, 'Please provide the pronunciation!'],
            trim: true,
        },
        image: {
            type: String,
            required: [true, 'Please provide an image!'],
            trim: true,
        },
        vietnamese: {
            type: String,
            required: [true, 'Please provide the Vietnamese translation!'],
            trim: true,
        },
        nameTopic: {
            type: String,
            required: [true, 'Please provide the name Topic!'],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);
// add plugin that converts mongoose to json
wordSchema.plugin(toJSON);
wordSchema.plugin(paginate);

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
