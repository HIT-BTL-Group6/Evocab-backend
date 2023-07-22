const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const userWordValidation = require('../../validations/userWord.validation');
const userWordController = require('../../controllers/userWord.controller');
const userWordRouter = express.Router();

userWordRouter
    .route('/')
    .post(validate(userWordValidation.createUserWord), userWordController.createUserWord)
    .get(validate(userWordValidation.getUserWords), userWordController.getUserWordsController);

userWordRouter
    .route('/:userWordId')
    .get(validate(userWordValidation.getUserWordById), userWordController.getUserWordById)
    .put(validate(userWordValidation.updateUserWordById),userWordController.updateUserWordById)
    .delete(validate(userWordValidation.deleteUserWordById), userWordController.deleteUserWordById);
userWordRouter
    .route('/:userWordId/word')
    .post(validate(userWordValidation.addWordFromUserWordById), userWordController.addWordFromUserWordByIdController)
    .delete(validate(userWordValidation.deleteWordFromUserWordById, userWordController.addWordFromUserWordByIdController));
    
module.exports = userWordRouter;
