const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const ExamOfUser = require('../models/examOfUser.model');

const getExamOfUserById = async (examId) => {
    const exam = await ExamOfUser.findById(examId).populate(['exam', 'user']);

    if (!exam) throw new ApiError(httpStatus.NOT_FOUND, 'Exam not found!');
    return exam;
};

const updateExamOfUserById = async (examId, examBody) => {
    const updatedExam = ExamOfUser.findByIdAndUpdate(examId, examBody, { new: true });

    if (!updatedExam) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Exam not found!');
    }
    return updatedExam;
};

const deleteExamOfUserById = async (examId) => {
    const deletedExam = await ExamOfUser.findByIdAndDelete(examId);
    if (!deletedExam) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Exam not found!');
    }
    return deletedExam;
};

module.exports = {
    getExamOfUserById,
    updateExamOfUserById,
    deleteExamOfUserById,
};
