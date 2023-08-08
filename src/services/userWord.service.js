const httpStatus = require('http-status');
const UserWord = require('../models/userWord.model');
const ApiError = require('../utils/ApiError');
// const Question = require('../models/question.model');
// const UseWord = require('../models/userWord.model');
// const Word = require('../models/word.model');

const createUserWord = async (userWordBody) => {
    const existingUserWord = await UserWord.findOne({ userId: userWordBody.userId });
    if (existingUserWord) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'UserWord already exists!');
    }
    const newUserWord = await UserWord.create(userWordBody);
    return newUserWord;
};

const getUserWords = async (filter, options) => {
    const userWords = await UserWord.paginate(filter, options);
    if (!userWords) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWords not found');
    }
    return userWords;
};
const getRememberUserWordsIds = async (userWordId) => {
    const userWord = await UserWord.findById(userWordId);
    if (!userWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWord not found');
    }

    const rememberedWords = userWord.words.filter((word) => word.isRemember === 'true');
    const wordIds = rememberedWords.map((word) => word.wordId.toString());
    if (wordIds) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
    return wordIds;
};

const getNotRememberUserWordsIds = async (userWordId) => {
    const userWord = await UserWord.findById(userWordId);
    if (!userWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWord not found');
    }

    const notRememberedWords = userWord.words.filter((word) => word.isRemember === 'false');
    const wordIds = notRememberedWords.map((word) => word.wordId.toString());
    if (wordIds) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
    return wordIds;
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
const addWordToUserWordById = async (userWordId, wordsBody) => {
    const rawUserWord = await UserWord.findById(userWordId);
    if (!rawUserWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWord not found');
    }
    const uniqueUserWordIds = new Set(rawUserWord.words.map((word) => word.toString()));
    wordsBody.words.forEach((wordId) => uniqueUserWordIds.add(wordId));
    rawUserWord.words = Array.from(uniqueUserWordIds);
    await rawUserWord.save();
    return rawUserWord;
};
const deleteWordFromUserWordById = async (userWordId, wordId) => {
    const userWord = await UserWord.findById(userWordId);
    if (!userWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'userWord not found');
    }
    const isExistInWords = userWord.words.includes(wordId);
    if (!isExistInWords) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Word does not exist in the UserWord');
    }
    userWord.words = userWord.words.filter((id) => id.toString() !== wordId);
    const updatedUserWord = await userWord.save();
    return updatedUserWord;
};
const deleteUserWordById = async (userWordId) => {
    const deletedUserWord = await UserWord.findByIdAndDelete(userWordId);
    if (!deletedUserWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User word not found');
    }
    return deletedUserWord;
};
const updateWordFromUserWordById = async (userWordId, wordId, updateBody) => {
    const userWord = await UserWord.findById(userWordId);
    if (!userWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWord not found');
    }
    const wordIndex = userWord.words.findIndex((word) => word.wordId.toString() === wordId);
    if (wordIndex === -1) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Word not found in UserWord');
    }
    userWord.words[wordIndex].isRemember = updateBody.isRemember;
    await userWord.save();
    return userWord;
};
module.exports = {
    createUserWord,
    getUserWords,
    getRememberUserWordsIds,
    getNotRememberUserWordsIds,
    getUserWordById,
    updateUserWordById,
    deleteUserWordById,
    deleteWordFromUserWordById,
    addWordToUserWordById,
    updateWordFromUserWordById,
};
