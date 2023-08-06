const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const ExamOfUser = require('../models/examOfUser.model');

const getExamOfUserById = async (examId) => {
    const exam = await ExamOfUser.findById(examId).populate(['exam', 'user']);

    if (!exam) throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy đề thi này!');
    return exam;
};

const updateExamOfUserById = async (examId, examBody) => {
    // const { examName } = examBody;

    // if (!examName) throw new ApiError(httpStatus.NOT_FOUND, 'Trường topic không được phép để trống!');

    // const topicInfo = await Topic.findOne({ nameTopic: topic });
    // if (!topicInfo) {
    //     throw new ApiError(httpStatus.NOT_FOUND, 'Topic này không tồn tại!');
    // }

    const updatedExam = ExamOfUser.findByIdAndUpdate(examId, examBody, { new: true });

    if (!updatedExam) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy  đề thi này!');
    }
    return updatedExam;
    Đề;
};

const deleteExamOfUserById = async (examId) => {
    const deletedExam = await ExamOfUser.findByIdAndDelete(examId);
    if (!deletedExam) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Đề thi này không tồn tại!');
    }
    return deletedExam;
};

module.exports = {
    getExamOfUserById,
    updateExamOfUserById,
    deleteExamOfUserById,
};