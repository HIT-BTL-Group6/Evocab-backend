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
        wordType: {
            type: String,
            required: [true, 'Please provide the word type!'],
            trim: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        topic_id: {
            type: Schema.Types.ObjectId,
            ref: 'Topic',
            required: [true, 'Please provide the topic ID!'],
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

/**
 * Check if word is taken
 * @param {string} word - The word to check
 * @param {ObjectId} [excludeWordId] - The ID of the word to be excluded
 * @returns {Promise<boolean>}
 */
// Static method to check if a word exists
wordSchema.statics.isWordTaken = async function (word, excludeWordId) {
    const existingWord = await this.findOne({ word, _id: { $ne: excludeWordId } });
    return !!existingWord;
};

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
