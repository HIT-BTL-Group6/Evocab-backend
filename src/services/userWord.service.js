const httpStatus = require('http-status');
const UserWord = require('../models/userWord.model');
const ApiError = require('../utils/ApiError');
const Question = require('../models/question.model');
const UseWord = require('../models/userWord.model');
const Word = require('../models/word.model');

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
    if (!userWords || userWords.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWords not found');
    }
    return userWords;
};
const getRememberUserWordsIds = async (userId) => {
    const userWord = await UserWord.findOne({ userId: userId });
    if (!userWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWord not found');
    }
    const rememberedWords = userWord.words.filter((word) => word.isRemember === 'true');
    const wordIds = rememberedWords.map((word) => word.wordId.toString());
    if (wordIds.length === 0 || !wordIds) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'No remembered words found');
    }
    return wordIds;
};

const getNotRememberUserWords = async (userId) => {
    const userWord = await UserWord.findOne({ userId: userId });
    if (!userWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWord not found');
    }
    const notRememberedWords = userWord.words.filter((word) => word.isRemember === 'false');
    const wordIds = notRememberedWords.map((word) => word.wordId.toString());
    console.log(wordIds);
    if (wordIds.length === 0 || !wordIds) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'No not-remembered words found');
    }

    const words = await Word.find({ _id: { $in: wordIds } }, 'word pronunciation vietnamese'); // Truy vấn các trường word, pronunciation và vietnamese
    return words;
};

const getUserWordById = async (userId) => {
    const userWord = await UserWord.findOne({ userId: userId });
    if (!userWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWord not found');
    }
    return userWord;
};

const updateUserWordById = async (userId, updateBody) => {
    const isUserWord = await UserWord.findOne({ userId: userId });
    if (!isUserWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWord not found');
    }
    const userWordId = isUserWord._id;
    const userWord = await UserWord.findByIdAndUpdate(userWordId, updateBody, { new: true });
    if (!userWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWord not found');
    }
    return userWord;
};
const addWordToUserWordById = async (userId, wordId, isRemember, note) => {
    const rawUserWord = await UserWord.findOne({ userId: userId });
    if (!rawUserWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWord not found');
    }
    const wordExists = rawUserWord.words.some((word) => word.wordId.toString() === wordId);
    if (wordExists) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Word already exists in UserWord');
    }
    const newWord = {
        wordId: wordId,
        isRemember: isRemember,
        note: note,
    };
    rawUserWord.words.push(newWord);

    await rawUserWord.save();
    return rawUserWord;
};
const deleteWordFromUserWordById = async (userId, wordId) => {
    const userWord = await UserWord.findOne({ userId: userId });
    if (!userWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'userWord not found');
    }
    const isExistInWords = userWord.words.some((word) => word.wordId.toString() === wordId);
    if (!isExistInWords) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Word does not exist in the UserWord');
    }
    userWord.words = userWord.words.filter((word) => word.wordId.toString() !== wordId);
    const updatedUserWord = await userWord.save();
    return updatedUserWord;
};
const deleteUserWordById = async (userId) => {
    const userWord = await UserWord.findOne({ userId: userId });
    if (!userWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'userWord not found');
    }
    const userWordId = userWord._id;
    const deletedUserWord = await UserWord.findByIdAndDelete(userWordId);
    if (!deletedUserWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User word not found');
    }
    return deletedUserWord;
};

const updateWordFromUserWordById = async (userId, wordId, note, isRemember) => {
    const userWord = await UserWord.findOne({ userId: userId });
    if (!userWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'userWord not found');
    }
    const wordIndex = userWord.words.findIndex((word) => word.wordId.toString() === wordId);
    if (wordIndex === -1) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Word not found in UserWord');
    }
    userWord.words[wordIndex].isRemember = isRemember;
    userWord.words[wordIndex].note = note;

    await userWord.save();
    return userWord;
};

const getNotRememberWordIds = async (userWordId) => {
    const userWord = await UserWord.findById(userWordId);
    if (!userWord) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserWord not found');
    }
    const notRememberedWords = userWord.words.filter((word) => word.isRemember === 'false');
    const wordIds = notRememberedWords.map((word) => word.wordId.toString());
    if (wordIds.length === 0 || !wordIds) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'No not-remembered words found');
    }
    return wordIds;
};

const updateRememberWord = async (userWordId, userWordData, wordId) => {
    const wordInfo = await Word.findById(wordId);
    if (!wordInfo) throw new ApiError(httpStatus.NOT_FOUND, 'Word not found!');

    const userWordInfo = await UseWord.findById(userWordId);
    if (!userWordInfo) throw new ApiError(httpStatus.NOT_FOUND, 'UserWord not found!');

    const wordsOfUser = userWordInfo.words || [];

    const wordIndexNeedUpdated = wordsOfUser.findIndex((wordObj) => wordObj.wordId.toString() === wordId);
    if (wordIndexNeedUpdated === -1) throw new ApiError(httpStatus.NOT_FOUND, 'Word need to update not exists!');

    const updatedWordsOfUser = [...wordsOfUser];
    updatedWordsOfUser[wordIndexNeedUpdated].isRemember = 'true';

    userWordInfo.words = updatedWordsOfUser;
    await userWordInfo.save();

    return userWordInfo;
};
const getReviewQuestion = async (userWordId) => {
    const reviewWordIds = await getNotRememberWordIds(userWordId);

    const reviewQuestions = await Question.find({ 'answer.word_correct': { $in: reviewWordIds } }).exec();
    if (!reviewQuestions.length) throw new ApiError(httpStatus.NOT_FOUND, 'Question not found!');

    return reviewQuestions;
};
module.exports = {
    createUserWord,
    getUserWords,
    getRememberUserWordsIds,
    getNotRememberUserWords,
    getUserWordById,
    updateUserWordById,
    deleteUserWordById,
    deleteWordFromUserWordById,
    addWordToUserWordById,
    updateWordFromUserWordById,
    getReviewQuestion,
    updateRememberWord,
};
