const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');
const roles = require('../../middlewares/role.middleware');
const topicValidation = require('../../validations/topic.validation');
const topicController = require('../../controllers/topic.controller');

const topicRouter = express.Router();
topicRouter
    .route('/')
    .post(authMiddleware,roles('admin'),validate(topicValidation.createTopic), topicController.createTopic)
    .get(validate(topicValidation.getTopics), topicController.getTopics);
topicRouter
    .route('/:topicId')
    .get(validate(topicValidation.getTopicById), topicController.getTopicById)
    .put(authMiddleware,roles('admin'), validate(topicValidation.updateTopicById), topicController.updateTopicById)
    .delete(authMiddleware,roles('admin'),validate(topicValidation.deleteTopicById), topicController.deleteTopicById);
topicRouter
    .route('/:topicId/word/:wordId')
    .delete(authMiddleware,roles('admin'),validate(topicValidation.deleteWordFromTopicById), topicController.deleteWordFromTopicByIdController);
topicRouter
    .route('/:topicId/word/')
    .post(authMiddleware,roles('admin'),validate(topicValidation.addWordToTopicById), topicController.addWordToTopicByIdController);
module.exports = topicRouter;