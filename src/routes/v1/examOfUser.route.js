const express = require('express');
const { examOfUserController } = require('../../controllers');
const authMiddleware = require('../../middlewares/auth.middleware');
const roles = require('../../middlewares/role.middleware');

const examOfUserRouter = express.Router();

examOfUserRouter.use(authMiddleware);

examOfUserRouter.route('/').get(examOfUserController.getExamsOfUser);

examOfUserRouter
    .route('/:examId')
    .get(examOfUserController.getExamOfUser)
    .put(examOfUserController.updateExamOfUser)
    .delete(examOfUserController.deleteExamOfUser);

module.exports = examOfUserRouter;
