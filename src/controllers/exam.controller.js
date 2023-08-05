const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const Exam = require('../models/exam.model');
const { examService } = require('../services');

const getExams = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['question']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const exams = await Exam.paginate(filter, options);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Get exams successfully!',
        data: exams,
    });
});

const getExam = catchAsync(async (req, res) => {
    const examId = req.params.examId || req.exam.id;

    const exam = await examService.getExamById(examId);
    const startTime = new Date();
    console.log(startTime);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Get exam successfully!',
        data: exam,
        startTime: startTime,
    });
});

const createExam = catchAsync(async (req, res) => {
    const examData = req.body;
    const newExam = await examService.createExam(examData);

    res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED,
        message: 'Create exam successfully!',
        data: newExam,
    });
});

const updateExam = catchAsync(async (req, res) => {
    const { examId } = req.params;
    const examBody = req.body;

    const exam = await examService.updateExamById(examId, examBody);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Update exam successfully!',
        data: exam,
    });
});

const deleteExam = catchAsync(async (req, res) => {
    const { examId } = req.params;
    const deletedExam = await examService.deleteExamById(examId);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Delete exam successfully!',
        data: deletedExam,
    });
});

module.exports = {
    getExam,
    getExams,
    createExam,
    updateExam,
    deleteExam,
};
