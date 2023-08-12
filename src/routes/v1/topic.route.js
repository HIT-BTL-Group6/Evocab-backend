const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');
const roles = require('../../middlewares/role.middleware');
const topicValidation = require('../../validations/topic.validation');
const topicController = require('../../controllers/topic.controller');
const topicRouter = express.Router();
topicRouter.use(authMiddleware);

topicRouter
    .route('/')
    .post(validate(topicValidation.createTopic), topicController.createTopic)
    .get(validate(topicValidation.getTopics), topicController.getTopics);
topicRouter
    .route('/:topicId')
    .get(validate(topicValidation.getTopicById), topicController.getTopicById)
    .put(roles('admin'), validate(topicValidation.updateTopicById), topicController.updateTopicById)
    .delete(roles('admin'),validate(topicValidation.deleteTopicById), topicController.deleteTopicById);
topicRouter
    .route('/delete-word/:topicId/')
    .delete(roles('admin'),validate(topicValidation.deleteWordFromTopicById), topicController.deleteWordFromTopicByIdController);
topicRouter
    .route('/add-word/:topicId')
    .post(roles('admin'),validate(topicValidation.addWordToTopicById), topicController.addWordToTopicByIdController);
module.exports = topicRouter;
