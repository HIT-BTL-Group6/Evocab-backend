const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { topicService } = require('../services');
const mongoose = require('mongoose');

const createTopic = catchAsync(async (req, res) => {
    const topicData = req.body;
    const topicCreated = await topicService.createTopic(topicData);
    res.status(httpStatus.CREATED).json({
        message: 'Create Topic successfully!',
        data: topicCreated,
    });
});

const getTopics = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['nameTopic']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const topics = await topicService.getTopics(filter, options);
    res.status(httpStatus.OK).json(topics);
});
const getTopicById = catchAsync(async (req, res) => {
    const { topicId } = req.params;
    const topic = await topicService.getTopicById(topicId);
    res.status(httpStatus.OK).json(topic);
});

const updateTopicById = catchAsync(async (req, res) => {
    const { topicId } = req.params;
    const topic = req.body;
    const topicCreated = await topicService.updateTopicById(topicId, topic);
    res.status(httpStatus.OK).json({
        message: 'Update Topic successfully!',
        data: topicCreated,
    });
});

const deleteWordFromTopicByIdController = catchAsync(async (req, res) => {
    const { topicId,wordId} = req.params;
    await topicService.deleteWordFromTopicById(topicId, wordId);
    res.status(httpStatus.OK).json({ message: 'Topic deleted from Topic successfully' });
});

const addWordToTopicByIdController = catchAsync(async (req, res) => {
    const { topicId } = req.params;
    const words = req.body.words;
    await topicService.addWordToTopicById(topicId, { words });
    res.status(httpStatus.OK).json({ message: 'Word added to Topic successfully' });
});

const deleteTopicById = catchAsync(async (req, res) => {
    const { topicId } = req.params;
    await topicService.deleteTopicById(topicId);
    res.status(httpStatus.OK).json({ message: 'Topic deleted successfully' });
});
module.exports = {
    createTopic,
    getTopics,
    getTopicById,
    updateTopicById,
    deleteWordFromTopicByIdController,
    addWordToTopicByIdController,
    deleteTopicById,
};
