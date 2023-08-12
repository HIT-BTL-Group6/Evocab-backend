const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const ExamOfUser = require('../models/examOfUser.model');
const examOfUserService = require('../services/examOfUser.service');

const getExamsOfUser = catchAsync(async (req, res) => {
    const { sortBy, limit = 10, page = 1, ...conditions } = req.query;
    const skip = (page - 1) * limit;

    const exams = await examOfUserService.getExamsOfUser(limit, skip, conditions);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Get exams of user successfully!',
        data: exams,
    });
});

const updateStartExamTime = catchAsync(async (req, res) => {
    const { startExamTime } = req.body;
    const { examUserId } = req.params;
    const updatedExam = await examOfUserService.updateExamOfUserByExamUserId(examUserId, { startExamTime });

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Update start exam time successfully!',
        data: updatedExam,
    });
});

const updateEndExam = catchAsync(async (req, res) => {
    const { endExamTime, result, status } = req.body;
    const { examUserId } = req.params;
    const updatedExam = await examOfUserService.updateExamOfUserByExamUserId(examUserId, { endExamTime, result, status });

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Update end exam time successfully!',
        data: updatedExam,
    });
});

const getExamOfUser = catchAsync(async (req, res) => {
    const examUserId = req.params.examUserId || req.examofuser.id;

    const exam = await examOfUserService.getExamOfUserByExamUserId(examUserId);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Get exam of user successfully!',
        data: exam,
    });
});

const updateExamOfUser = catchAsync(async (req, res) => {
    const { examUserId } = req.params;
    const examBody = req.body;

    const exam = await examOfUserService.updateExamOfUserByExamUserId(examUserId, examBody);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Update exam of user successfully!',
        data: exam,
    });
});

const deleteExamOfUser = catchAsync(async (req, res) => {
    const { examUserId } = req.params;
    const deletedExamUser = await examOfUserService.deleteExamOfUserByExamUserId(examUserId);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Delete exam of user successfully!',
        data: deletedExamUser,
    });
});

module.exports = {
    getExamOfUser,
    getExamsOfUser,
    updateStartExamTime,
    updateEndExam,
    updateExamOfUser,
    deleteExamOfUser,
};
