const httpStatus = require('http-status');
const UserWord = require('../models/userWord.model');
const ApiError = require('../utils/ApiError');

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

module.exports = {
    createUserWord,
    getUserWords,
    getUserWordById,
    updateUserWordById,
    deleteUserWordById,
    deleteWordFromUserWordById,
    addWordToUserWordById
};
