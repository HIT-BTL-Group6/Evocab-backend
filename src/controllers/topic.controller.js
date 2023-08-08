const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { topicService } = require('../services');

const createTopic = catchAsync(async (req, res) => {
    const topicData = req.body;
    const topicCreated = await topicService.createTopic(topicData);
    res.status(httpStatus.CREATED).json({
        status: httpStatus.CREATED,
        message: 'Topic created successfully!',
        data: topicCreated,
    });
});

const getTopics = catchAsync(async (req, res) => {
    const nameTopic = req.query.nameTopic;
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const topicData = await topicService.getTopics(nameTopic, options);
    res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: 'Topics retrieved successfully!',
        data: topicData,
    });
});

const getTopicById = catchAsync(async (req, res) => {
    const { topicId } = req.params;
    const topic = await topicService.getTopicById(topicId);

    res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: 'Topic retrieved successfully!',
        data: topic,
    });
});

const updateTopicById = catchAsync(async (req, res) => {
    const { topicId } = req.params;
    const topic = req.body;
    const topicUpdated = await topicService.updateTopicById(topicId, topic);
    res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: 'Topic updated successfully!',
        data: topicUpdated,
    });
});

const deleteWordFromTopicByIdController = catchAsync(async (req, res) => {
    const { topicId, wordId } = req.params;
    const wordDeleted = await topicService.deleteWordFromTopicById(topicId, wordId);
    res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: 'Word deleted from Topic successfully!',
        data: wordDeleted,
    });
});

const addWordToTopicByIdController = catchAsync(async (req, res) => {
    const { topicId } = req.params;
    const words = req.body.words;

    const topics = await topicService.addWordToTopicById(topicId, { words });
    res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: 'Words added to Topic successfully!',
        data: topics,
    });
});

const deleteTopicById = catchAsync(async (req, res) => {
    const { topicId } = req.params;
    const topicDeleted = await topicService.deleteTopicById(topicId);
    res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        message: 'Topic deleted successfully!',
        data: topicDeleted,
    });
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
