const httpStatus = require('http-status');
const Word = require('../models/word.model');
const ApiError = require('../utils/ApiError');
const Topic = require('../models/topic.model');

const createWord = async (wordBody) => {
    const existingWord = await Word.findOne({ word: wordBody.word });
    if (existingWord) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Word already exists');
    }
    const word = await Word.create(wordBody);
    return word;
};
const getWordById = async (id) => {
    const word = await Word.findById(id);
    if (!word) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Word not found');
    }
    return word;
};

const updateWordById = async (wordId, updateBody) => {
    const word = await Word.findByIdAndUpdate(wordId, updateBody, { new: true });
    if (!word) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Word not found');
    }
    return word;
};

const deleteWordById = async (wordId) => {
    const deletedWord = await Word.findByIdAndDelete(wordId);
    if (!deletedWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Word not found');
    }
    return deletedWord;
};
const getWords = async (topicId, options) => {
    const filter = {};
    const topic = await Topic.findById(topicId);
    if (topic) {
        filter.nameTopic= topic.nameTopic;
    }
    const words = await Word.paginate(filter, options);
    if (!words || words.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Words not found');
    }
    return words;
};

module.exports = {
    createWord,
    getWords,
    getWordById,
    updateWordById,
    deleteWordById,
};