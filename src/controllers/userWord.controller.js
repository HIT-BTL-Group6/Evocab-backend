const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { userWordService } = require('../services');

const createUserWord = catchAsync(async (req, res) => {
    const userWordData = req.body;
    const userWord = await userWordService.createUserWord(userWordData);
    res.status(httpStatus.CREATED).json({
        message: 'Created UserWord successfully!',
        data: userWord,
    });
});

const getUserWordsController = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['userWordId']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const userWords = await userWordService.getUserWords(filter, options);
    console.log(filter);
    res.status(httpStatus.OK).json({
        message: 'get UserWord successfully!',
        data: userWords,
    });
});
const getRememberUserWords = catchAsync(async (req, res) => {
    const { userWordId } = req.params; 
    const userWords = await userWordService.getRememberUserWordsIds(userWordId);
    res.status(httpStatus.OK).json({
        message: 'get wordId is True successfully!',
        words: userWords,
    });
});
const getNotRememberUserWords = catchAsync(async (req, res) => {
    const { userWordId } = req.params;
    const userWords = await userWordService.getNotRememberUserWordsIds(userWordId);
    res.status(httpStatus.OK).json({
        message: 'get wordId is False successfully!',
        words: userWords,
    });
});
const getUserWordById = catchAsync(async (req, res) => {
    const { userWordId } = req.params;
    const userWord = await userWordService.getUserWordById(userWordId);
    res.status(httpStatus.OK).json({
        message: 'Get UserWord By Id successfully!',
        data: userWord,
    });
});

const updateUserWordById = catchAsync(async (req, res) => {
    const { userWordId } = req.params;
    const updateBody = req.body;
    const userWord = await userWordService.updateUserWordById(userWordId, updateBody);
    res.status(httpStatus.OK).json({
        message: 'Update UserWord successfully!',
        data: userWord,
    });
});

const deleteWordFromUserWordByIdController = catchAsync(async (req, res) => {
    const { userWordId, wordId } = req.params;
    const wordDeleted = await userWordService.deleteWordFromUserWordById(userWordId, wordId);
    res.status(httpStatus.OK).json({ 
        message: 'Word deleted from UserWord successfully', 
        data: wordDeleted
    });
});

const addWordToUserWordByIdController = catchAsync(async (req, res) => {
    const { userWordId } = req.params;
    const words = req.body.words;
    const userWords = await userWordService.addWordToUserWordById(userWordId, { words });
    res.status(httpStatus.OK).json({ 
        message: 'Word added to UserWord successfully', 
        data: userWords 
    });
});
const deleteUserWordById = catchAsync(async (req, res) => {
    const { userWordId } = req.params;
    const userWordDeleted = await userWordService.deleteUserWordById(userWordId);
    res.status(httpStatus.OK).json({ 
        message: 'UserWord deleted successfully',
        data:userWordDeleted 
    });
});
module.exports = {
    createUserWord,
    getUserWordsController,
    getUserWordById,
    getNotRememberUserWords,
    updateUserWordById,
    deleteWordFromUserWordByIdController,
    addWordToUserWordByIdController,
    deleteUserWordById,
    getRememberUserWords,
};
