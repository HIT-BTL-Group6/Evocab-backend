const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');
const roles = require('../../middlewares/role.middleware');
const userWordValidation = require('../../validations/userWord.validation');
const userWordController = require('../../controllers/userWord.controller');
const userWordRouter = express.Router();

userWordRouter
    .route('/')
    .post(authMiddleware, roles('admin'), validate(userWordValidation.createUserWord), userWordController.createUserWord)
    .get(authMiddleware,roles('admin'), validate(userWordValidation.getUserWords), userWordController.getUserWordsController);

userWordRouter
    .route('/:userId')
    .get(authMiddleware, validate(userWordValidation.getUserWordById), userWordController.getUserWordById)
    .get(validate(userWordValidation.getUserWordById), userWordController.getMeById)
userWordRouter
    .route('/:userId')
    .put(
        authMiddleware,
        validate(userWordValidation.updateUserWordById),
        userWordController.updateUserWordById
    )
    .delete(authMiddleware,roles('admin'), validate(userWordValidation.deleteUserWordById), userWordController.deleteUserWordById);
userWordRouter
    .route('/delete-word/:userId')
    .delete(
        validate(userWordValidation.deleteWordFromUserWordById),
        userWordController.deleteWordFromUserWordByIdController
    )
userWordRouter
    .route('/add-word/:userId')
    .post(
        validate(userWordValidation.addWordToUserWordById),
        userWordController.addWordToUserWordByIdController
    );
userWordRouter.route('/remember-word/:userId').get( userWordController.getRememberUserWords);
userWordRouter.route('/not-remember-word/:userId').get(userWordController.getNotRememberUserWords);
userWordRouter
    .route('/update-word/:userId')
    .put(
        validate(userWordValidation.updateWordFromUserWordById),
        userWordController.updateWordFromUserWordById
    );
userWordRouter.route('/review-questions/:userWordId').get(userWordController.getReviewQuestion);
userWordRouter.route('/update-remember/:userWordId').put(userWordController.updateRememberWord);
module.exports = userWordRouter;
