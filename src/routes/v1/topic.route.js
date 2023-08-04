const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const topicValidation = require('../../validations/topic.validation');
const topicController = require('../../controllers/topic.controller');

const topicRouter = express.Router();

topicRouter
    .route('/')
    .post(validate(topicValidation.createTopic), topicController.createTopic)
    .get(validate(topicValidation.getTopics), topicController.getTopics);

topicRouter
    .route('/:topicId')
    .get(validate(topicValidation.getTopicById), topicController.getTopicById)
    .put(validate(topicValidation.updateTopicById), topicController.updateTopicById)
    .delete(validate(topicValidation.deleteTopicById), topicController.deleteTopicById);
topicRouter
    .route('/:topicId/word/:wordId')
    .delete(validate(topicValidation.deleteWordFromTopicById), topicController.deleteWordFromTopicByIdController);
topicRouter
    .route('/:topicId/word/')
    .post(validate(topicValidation.addWordToTopicById), topicController.addWordToTopicByIdController);
module.exports = topicRouter;
