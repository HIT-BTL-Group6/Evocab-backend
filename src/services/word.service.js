const httpStatus = require('http-status');
const Word = require('../models/word.model');
const ApiError = require('../utils/ApiError');
const createWord = async (wordBody) => {
    const word = await Word.findOne({ word: wordBody.word });
    if (word) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Word is required!');
    }
    return Word.create(wordBody);
};
const getWords = async (filter, options) => {
    const words = await Word.paginate(filter, options);
    if (!words) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Word not found');
    }
    return words;
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
        throw new ApiError(httpStatus.NOT_FOUND, 'Word not found!');
    }
    return deletedWord;
};

module.exports = {
    createWord,
    getWords,
    getWordById,
    updateWordById,
    deleteWordById,
};
