const express = require('express');
const { examOfUserController } = require('../../controllers');
const authMiddleware = require('../../middlewares/auth.middleware');
const roles = require('../../middlewares/role.middleware');

const examOfUserRouter = express.Router();

examOfUserRouter.use(authMiddleware);

examOfUserRouter.route('/exam-of-me').get(examOfUserController.getExamOfUser);

examOfUserRouter.route('/').get(roles('admin'), examOfUserController.getExamsOfUser);

examOfUserRouter
    .route('/:examUserId')
    .get(roles('admin'), examOfUserController.getExamOfUser)
    .put(roles('admin'), examOfUserController.updateExamOfUser)
    .delete(roles('admin'), examOfUserController.deleteExamOfUser);

examOfUserRouter.route('/update-start-exam/:examUserId').put(examOfUserController.updateStartExamTime);

examOfUserRouter.route('/update-end-exam/:examUserId').put(examOfUserController.updateEndExam);

module.exports = examOfUserRouter;
