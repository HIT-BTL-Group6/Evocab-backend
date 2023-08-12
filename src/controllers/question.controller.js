const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const Question = require('../models/question.model');
const { questionService } = require('../services');

const getQuestions = catchAsync(async (req, res, next) => {
    const options = pick(req.query, ['sortBy', 'limit', 'page']);

    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const skip = (page - 1) * limit;
    const questions = await Question.find()
        .limit(limit)
        .skip(skip)
        .populate({
            path: 'topic',
            select: 'nameTopic',
        })
        .populate({
            path: 'answer.word_correct',
            select: 'example word image vietnamese',
        });

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Get questions successfully!',
        data: questions,
    });
});

const getQuestion = catchAsync(async (req, res, next) => {
    const { questionId } = req.params;
    const question = await questionService.getQuestionById(questionId);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Get question successfully!',
        data: question,
    });
});

const createQuestion = catchAsync(async (req, res, next) => {
    const questionData = req.body;
    const newQuestion = await questionService.createQuestion(questionData);

    res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED,
        message: 'Create question successfully!',
        data: newQuestion,
    });
});

const updateQuestion = catchAsync(async (req, res, next) => {
    const { questionId } = req.params;
    const questionBody = req.body;

    const question = await questionService.updateQuestionById(questionId, questionBody);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Update question successfully!',
        data: question,
    });
});

const deleteQuestion = catchAsync(async (req, res, next) => {
    const { questionId } = req.params;
    const deletedQuestion = await questionService.deleteQuestionById(questionId);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Delete question successfully!',
        data: deletedQuestion,
    });
});

module.exports = {
    getQuestion,
    getQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
};
