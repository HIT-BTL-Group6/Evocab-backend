const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Question = require('../models/question.model');
const Topic = require('../models/topic.model');
const Word = require('../models/word.model');

const getQuestionById = async (questionId) => {
    const question = await Question.findById(questionId).populate({
        path: 'topic',
        select: 'nameTopic',
    });

    if (!question) throw new ApiError(httpStatus.NOT_FOUND, 'Question not found!');
    return question;
};

const createQuestion = async (questionBody) => {
    const { topic: topicId } = questionBody;
    const wordCorrectId = questionBody.answer?.word_correct;
    const existWord = Word.findById(wordCorrectId);
    if (!existWord) throw new ApiError(httpStatus.NOT_FOUND, 'Word not found!');

    if (!topicId) throw new ApiError(httpStatus.NOT_FOUND, 'Topic is required!');

    const topicInfo = await Topic.findOne({ _id: topicId });
    if (!topicInfo) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Topic not found!');
    }

    const newQuestion = await Question.create(questionBody);

    return newQuestion;
};

const updateQuestionById = async (questionId, questionBody) => {
    const { topic } = questionBody;

    if (!topic) throw new ApiError(httpStatus.NOT_FOUND, 'Topic is required!');

    const topicInfo = await Topic.findOne({ nameTopic: topic });
    if (!topicInfo) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Topic not found!');
    }

    const updatedQuestion = Question.findByIdAndUpdate(questionId, questionBody, { new: true });

    if (!updatedQuestion) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Question not found!');
    }
    return updatedQuestion;
};

const deleteQuestionById = async (questionId) => {
    const deletedQuestion = await User.findByIdAndDelete(questionId);
    if (!deletedQuestion) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Question not found!');
    }
    return deletedQuestion;
};

module.exports = {
    getQuestionById,
    createQuestion,
    updateQuestionById,
    deleteQuestionById,
};
