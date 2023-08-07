const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { wordService } = require('../services');

const createWord = catchAsync(async (req, res) => {
    if (!req.files || Object.keys(req.files).length !== 2 || !req.files.image || !req.files.sound) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Both image and sound files are required');
    }

    const imageFile = req.files.image[0]; 
    const soundFile = req.files.sound[0];
    const imagePath = imageFile.path.replace(/\\/g, '/');
    const soundPath = soundFile.path.replace(/\\/g, '/'); 
    const wordData = {
        ...req.body,
        image: imagePath,
        sound: soundPath,
    };

    const word = await wordService.createWord(wordData);
    res.status(httpStatus.CREATED).json({
        status: httpStatus.CREATED,
        message: 'Word created successfully!',
        data: word,
    });
});

const getWords = catchAsync(async (req, res) => {
    const nameTopic = req.query.nameTopic;
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const words = await wordService.getWords(nameTopic, options);
    res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: 'Words retrieved successfully!',
        data: words,
    });
});

const getWord = catchAsync(async (req, res) => {
    const wordId = req.params.wordId || req.body.id;
    const word = await wordService.getWordById(wordId);
    res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: 'Word retrieved successfully!',
        data: word,
    });
});

const updateWord = catchAsync(async (req, res) => {
    const { wordId } = req.params;
    const wordUpdate = req.body;
    const word = await wordService.updateWordById(wordId, wordUpdate);
    res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: 'Word updated successfully!',
        data: word,
    });
});

const deleteWord = catchAsync(async (req, res) => {
    const wordId = req.params.wordId;
    const word = await wordService.deleteWordById(wordId);
    res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: 'Word deleted successfully!',
        data: word,
    });
});

module.exports = {
    createWord,
    getWords,
    getWord,
    updateWord,
    deleteWord
};
