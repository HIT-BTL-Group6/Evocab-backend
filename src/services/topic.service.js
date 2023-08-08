const httpStatus = require('http-status');
const Topic = require('../models/topic.model');
const ApiError = require('../utils/ApiError');

const createTopic = async (topicBody) => {
    const topic = await Topic.findOne({ nameTopic:topicBody.nameTopic });
    if (topic) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Topic is exist!');
    }
    const createdTopic = await Topic.create(topicBody);
    if (!createdTopic) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Topic not create!');
    }
    return createdTopic;
};

const getTopics = async (nameTopic, options) => {
    const filter = {};
    if (nameTopic) {
        filter.nameTopic = nameTopic;
    }
    const topics = await Topic.paginate(filter, options);
    if (!topics|| topics.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Topics not found');
    }
    return topics;
};

const getTopicById = async (id) => {
    const topic = await Topic.findById(id);

    if (!topic) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Topic not found');
    }
    return topic;
};

const updateTopicById = async (topicId, updateBody) => {
    const topic = await Topic.findByIdAndUpdate(topicId, updateBody, { new: true });
    if (!topic) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Topic not found');
    }
    return topic;
};

const deleteTopicById = async (topicId) => {
    const deletedTopic = await Topic.findByIdAndDelete(topicId);
    if (!deletedTopic) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Topic not found');
    }
    return deletedTopic;
};
const addWordToTopicById = async (topicId, wordsBody) => {
    const topic = await Topic.findById(topicId);
    if (!topic) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Topic not found');
    }
    const uniqueWordIds = new Set(topic.words.map((word) => word.toString()));
    wordsBody.words.forEach((wordId) => uniqueWordIds.add(wordId));
    topic.words = Array.from(uniqueWordIds);
    await topic.save();
    return topic;
};

const deleteWordFromTopicById = async (topicId, wordId) => {
    const topic = await Topic.findById(topicId);
    if (!topic) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Topic not found');
    }
    const isExistInWords = topic.words.includes(wordId);
    if (!isExistInWords) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Word does not exist in the topic');
    }
    topic.words = topic.words.filter((id) => id.toString() !== wordId);
    const updatedTopic = await topic.save();
    return updatedTopic;
};

module.exports = {
    createTopic,
    getTopics,
    getTopicById,
    updateTopicById,
    deleteTopicById,
    addWordToTopicById,
    deleteWordFromTopicById
};
