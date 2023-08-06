const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Question = require('../models/question.model');
const Topic = require('../models/topic.model');

const getQuestionById = async (questionId) => {
    const question = await Question.findById(questionId).populate({
        path: 'topic',
        select: 'nameTopic',
    });

    if (!question) throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy câu hỏi này!');
    return question;
};

const createQuestion = async (questionBody) => {
    const { topic } = questionBody;

    if (!topic) throw new ApiError(httpStatus.NOT_FOUND, 'Trường topic không được phép để trống!');

    const topicInfo = await Topic.findOne({ nameTopic: topic });
    if (!topicInfo) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Topic này không tồn tại!');
    }

    const newQuestion = await Question.create(questionBody);

    return newQuestion;
};

const updateQuestionById = async (questionId, questionBody) => {
    const { topic } = questionBody;

    if (!topic) throw new ApiError(httpStatus.NOT_FOUND, 'Trường topic không được phép để trống!');

    const topicInfo = await Topic.findOne({ nameTopic: topic });
    if (!topicInfo) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Topic này không tồn tại!');
    }

    const updatedQuestion = Question.findByIdAndUpdate(questionId, questionBody, { new: true });

    if (!updatedQuestion) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Không tìm thấy câu hỏi này!');
    }
    return updatedQuestion;
};

const deleteQuestionById = async (questionId) => {
    const deletedQuestion = await User.findByIdAndDelete(questionId);
    if (!deletedQuestion) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Câu hỏi này không tồn tại!');
    }
    return deletedQuestion;
};

module.exports = {
    getQuestionById,
    createQuestion,
    updateQuestionById,
    deleteQuestionById,
};
