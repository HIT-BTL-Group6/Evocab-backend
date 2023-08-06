const express = require('express');
const { examController } = require('../../controllers');
const authMiddleware = require('../../middlewares/auth.middleware');
const roles = require('../../middlewares/role.middleware');

const examRouter = express.Router();

examRouter.use(authMiddleware);

examRouter.route('/').get(examController.getExams).post(roles('admin'), examController.createExam);

examRouter
    .route('/:examId')
    .get(examController.getExam)
    .put(roles('admin'), examController.updateExam)
    .delete(roles('admin'), examController.deleteExam);

module.exports = examRouter;
