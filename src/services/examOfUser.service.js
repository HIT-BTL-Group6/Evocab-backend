const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const ExamOfUser = require('../models/examOfUser.model');

const getExamsOfUser = async (limit, skip, conditions) => {
    const examsOfUserId = await ExamOfUser.find(conditions).limit(limit).skip(skip).populate({
        path: 'exam',
        select: 'examName',
    });

    if (!examsOfUserId) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Exams of User not found');
    }
    return examsOfUserId;
};

const getExamOfUserByExamUserId = async (examUserId) => {

    const exam = await ExamOfUser.findById(examUserId).populate(['exam', 'user']);

    if (!exam) throw new ApiError(httpStatus.NOT_FOUND, 'Exam not found!');
    return exam;
};

const updateExamOfUserByExamUserId = async (examUserId, examBody) => {
    const updatedExam = ExamOfUser.findByIdAndUpdate(examUserId, examBody, { new: true });

    if (!updatedExam) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Exam not found!');
    }
    return updatedExam;
};

const deleteExamOfUserByExamUserId = async (examUserId) => {
    const deletedExam = await ExamOfUser.findByIdAndDelete(examUserId);
    if (!deletedExam) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Exam not found!');
    }
    return deletedExam;
};

module.exports = {
    getExamOfUserByExamUserId,
    updateExamOfUserByExamUserId,
    deleteExamOfUserByExamUserId,
    getExamsOfUser,
};
