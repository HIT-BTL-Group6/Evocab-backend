const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const ExamOfUser = require('../models/examOfUser.model');
const examOfUserService = require('../services/examOfUser.service');

const getExamsOfUser = catchAsync(async (req, res, next) => {
    const filter = pick(req.query, ['user_id', 'resutl', 'exam']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const exams = await ExamOfUser.paginate(filter, options);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Get exams of user successfully!',
        data: exams,
    });
});

const getExamOfUser = catchAsync(async (req, res, next) => {
    const examId = req.params.examId || req.exam.id;

    const exam = await examOfUserService.getExamOfUserById(examId);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Get exam of user successfully!',
        data: exam,
    });
});

const updateExamOfUser = catchAsync(async (req, res, next) => {
    const { examId } = req.params;
    const examBody = req.body;

    const exam = await examOfUserService.updateExamOfUserById(examId, examBody);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Update exam of user successfully!',
        data: exam,
    });
});

const deleteExamOfUser = catchAsync(async (req, res, next) => {
    const { examId } = req.params;
    const deletedExam = await examOfUserService.deleteExamOfUserById(examId);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Delete exam of user successfully!',
        data: deletedExam,
    });
});

module.exports = {
    getExamOfUser,
    getExamsOfUser,
    updateExamOfUser,
    deleteExamOfUser,
};
