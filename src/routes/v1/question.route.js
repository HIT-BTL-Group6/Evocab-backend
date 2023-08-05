const express = require('express');
const { questionController } = require('../../controllers');
const authMiddleware = require('../../middlewares/auth.middleware');
const roles = require('../../middlewares/role.middleware');

const questionRouter = express.Router();

questionRouter.use(authMiddleware);

// questionRouter.route('/').get(questionController.getQuestion).post(roles('admin'), questionController.createQuestion);

// questionRouter
//     .route('/:questionId')
//     .get(roles('admin'), questionController.getQuestion)
//     .put(roles('admin'), questionController.updateQuestion)
//     .delete(roles('admin'), questionController.deleteQuestion);

questionRouter.route('/').get(questionController.getQuestion).post(questionController.createQuestion);

questionRouter
    .route('/:questionId')
    .get(questionController.getQuestion)
    .put(questionController.updateQuestion)
    .delete(questionController.deleteQuestion);

module.exports = questionRouter;
