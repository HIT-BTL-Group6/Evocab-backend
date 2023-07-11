const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const { userValidation } = require('../../validations');
const { userController } = require('../../controllers');

const userRouter = express.Router();

userRouter
    .route('/')
    .get(validate(userValidation.getUsers), userController.getUsers)
    .post(validate(userValidation.createUser), userController.createUser);

userRouter
    .route('/:userId')
    .get(validate(userValidation.getUser), userController.getUser)
    .patch(validate(userValidation.updateUser), userController.updateUser)
    .delete(validate(userValidation.deleteUser), userController.deleteUser);

module.exports = userRouter;
