const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');
const roles = require('../../middlewares/role.middleware');
const userWordValidation = require('../../validations/userWord.validation');
const userWordController = require('../../controllers/userWord.controller');
const userWordRouter = express.Router();

userWordRouter.use(authMiddleware);
userWordRouter
    .route('/')
    .post(authMiddleware, roles('admin'), validate(userWordValidation.createUserWord), userWordController.createUserWord)
    .get(authMiddleware, validate(userWordValidation.getUserWords), userWordController.getUserWordsController);
// userWordRouter.route('/not-remember/:userWordId').get(authMiddleware, userWordController.getNotRememberUserWords);
// userWordRouter.route('/remember/:userWordId').get(authMiddleware, userWordController.getRememberUserWords);
userWordRouter
    .route('/:userWordId')
    .get(authMiddleware, roles('admin'), validate(userWordValidation.getUserWordById), userWordController.getUserWordById)
    .put(
        authMiddleware,
        roles('admin'),
        validate(userWordValidation.updateUserWordById),
        userWordController.updateUserWordById
    )
    .delete(authMiddleware,roles('admin'), validate(userWordValidation.deleteUserWordById), userWordController.deleteUserWordById);
userWordRouter
    .route('/delete-word/:userWordId')
    .delete(
        validate(userWordValidation.deleteWordFromUserWordById),
        userWordController.deleteWordFromUserWordByIdController
    )
userWordRouter
    .route('/add-word/:userWordId')
    .post(
        validate(userWordValidation.addWordToUserWordById),
        userWordController.addWordToUserWordByIdController
    );
userWordRouter.route('/remember-word/:userWordId').get( userWordController.getRememberUserWords);
userWordRouter.route('/not-remember-word/:userWordId').get(userWordController.getNotRememberUserWords);
userWordRouter
    .route('/update-word-remember/:userWordId')
    .put(
        validate(userWordValidation.updateWordFromUserWordById),
        userWordController.updateWordFromUserWordById
    );
userWordRouter.route('/review-questions/:userWordId').get(userWordController.getReviewQuestion);
userWordRouter.route('/update-remember/:userWordId').put(userWordController.updateRememberWord);
module.exports = userWordRouter;
