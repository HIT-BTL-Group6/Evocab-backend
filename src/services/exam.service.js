const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Exam = require('../models/exam.model');

const getExamById = async (examId) => {
    const exam = await Exam.findById(examId).populate('question');

    if (!exam) throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy đề thi này!');
    return exam;
};

const createExam = async (examBody) => {
    const { questions } = examBody;
    if (!questions.length) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Trường questions không được phép để trống');
    }
    const newExam = await Exam.create(examBody);

    return newExam;
};

const updateExamById = async (examId, examBody) => {
    const updatedExam = Exam.findByIdAndUpdate(examId, examBody, { new: true });

    if (!updatedExam) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy  đề thi này!');
    }
    return updatedExam;
};

const deleteExamById = async (examId) => {
    const deletedExam = await Exam.findByIdAndDelete(examId);
    if (!deletedExam) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy đề thi này!');
    }
    return deletedExam;
};

module.exports = {
    getExamById,
    createExam,
    updateExamById,
    deleteExamById,
};
