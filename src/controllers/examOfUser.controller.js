const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const ExamOfUser = require('../models/examOfUser.model');
const examOfUserService = require('../services/examOfUser.service');

const getExamsOfUser = catchAsync(async (req, res, next) => {
    const options = pick(req.query, ['sortBy', 'limit', 'page']);

    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const skip = (page - 1) * limit;
    const exams = await ExamOfUser.find().limit(limit).skip(skip).populate({
        path: 'exam',
        select: 'examName',
    });

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Get exams of user successfully!',
        data: exams,
    });
});

const createExam = catchAsync(async (req, res) => {
    const examData = req.body;
    const newExam = await ExamOfUser.create(examData);

    res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED,
        message: 'Create exam successfully!',
        data: newExam,
    });
});

const updateStartExamTime = catchAsync(async (req, res, next) => {
    const { startExamTime } = req.body;
    const { examId } = req.params;
    const updatedExam = await examOfUserService.updateExamOfUserById(examId, { startExamTime });

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Update start exam time successfully!',
        data: updatedExam,
    });
});

const updateEndExam = catchAsync(async (req, res, next) => {
    const { endExamTime, result, status } = req.body;
    const { examId } = req.params;
    const updatedExam = await examOfUserService.updateExamOfUserById(examId, { endExamTime, result, status });

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Update end exam time successfully!',
        data: updatedExam,
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
    createExam,
    updateStartExamTime,
    updateEndExam,
    updateExamOfUser,
    deleteExamOfUser,
};
