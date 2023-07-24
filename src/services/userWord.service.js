const httpStatus = require('http-status');
const UserWord = require('../models/userWord.model');
const ApiError = require('../utils/ApiError');

const createUserWord = async (userWordId) => {
    const newUserWord = await UserWord.findById(userWordId);
    if (newUserWord) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'UserWord is required!');
    }
    const userWord = await UserWord.create(newUserWord);
    return userWord;
};

const getUserWords = async (filter, options) => {
    const userWords = await UserWord.paginate(filter, options);
    if (!userWords) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWords not found');
    }
    return userWords;
};

const getUserWordById = async (userWordId) => {
    const userWord = await UserWord.findById(userWordId);
    if (!userWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWord not found');
    }
    return userWord;
};

const updateUserWordById = async (userWordId, updateBody) => {
    const userWord = await UserWord.findByIdAndUpdate(userWordId, updateBody, { new: true });
    if (!userWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWord not found');
    }
    return userWord;
};
const addWordFromUserWordById = async (userWordId, wordId) => {
    const userWord = await UserWord.findById(userWordId);
    if (!userWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWord not found');
    }
    const isExistInUserWord = UserWord[wordId].includes(userId);
    if (isExistInUserWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Word is exist');
    }
    UserWord[wordId].push(userId);
    const addWordToUserWord= await userWord.save();
    return addWordToUserWord;
};
const deleteWordFromUserWordById = async (userWordId, wordId) => {
    const userWord = await UserWord.findById(userWordId);
    if (!userWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWord not found');
    }
    const isExistInUserWord = UserWord[wordId].includes(wordIdId);
    if (!isExistInUserWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Word do not exist');
    }
    UserWord[wordId].remove(userId);
    const deleteWordToUserWord = await userWord.save();
    return deleteWordToUserWord;
};
const deleteUserWordById = async (userWordId, updateBody) => {
    const deletedUserWord = await UserWord.findByIdAndDelete(userWordId);
    if (!deletedUserWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User word not found');
    }
    return deletedUserWord;
};

module.exports = {
    createUserWord,
    getUserWords,
    getUserWordById,
    updateUserWordById,
    deleteUserWordById,
    deleteWordFromUserWordById,
    addWordFromUserWordById
};
