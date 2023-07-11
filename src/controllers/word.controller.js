const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { wordService } = require('../services');
const createWord = catchAsync(async (req, res) => {
    const { path } = req.file;
    const wordData = {
        ...req.body,
        image: path,
    };
    const word = await wordService.createWord(wordData);
    res.status(httpStatus.CREATED).json(word);
});

const getWords = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['wordType']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const words = await wordService.getWords(filter, options);
    res.status(httpStatus.OK).json(words);
});

const getWord = catchAsync(async (req, res) => {
    const wordId = req.params.wordId || req.body.id;
    const word = await wordService.getWordById(wordId);
    res.status(httpStatus.OK).json(word);
});

const updateWord = catchAsync(async (req, res) => {
    const {wordId} = req.params;
    const wordUpdate = req.body;
    console.log(wordId);
    const word = await wordService.updateWordById(wordId,wordUpdate);
    res.status(httpStatus.OK).json(word);
});

const deleteWord = catchAsync(async (req, res) => {
    const wordId = req.params.wordId;
    const word = await wordService.deleteWordById(wordId);
    res.status(httpStatus.OK).json(word);
});

module.exports = {
    createWord,
    getWords,
    getWord,
    updateWord,
    deleteWord,
};