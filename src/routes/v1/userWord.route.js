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
userWordRouter.route('/not-remember/:userWordId').get(authMiddleware, userWordController.getNotRememberUserWords);
userWordRouter.route('/remember/:userWordId').get(authMiddleware, userWordController.getRememberUserWords);
userWordRouter
    .route('/:userWordId/')
    .get(authMiddleware, roles('admin'), validate(userWordValidation.getUserWordById), userWordController.getUserWordById)
    .put(
        authMiddleware,
        roles('admin'),
        validate(userWordValidation.updateUserWordById),
        userWordController.updateUserWordById
    )
    .delete(authMiddleware, validate(userWordValidation.deleteUserWordById), userWordController.deleteUserWordById);
userWordRouter
    .route('/:userWordId/word/:wordId')
    .delete(
        authMiddleware,
        validate(userWordValidation.deleteWordFromUserWordById),
        userWordController.deleteWordFromUserWordByIdController
    )
    .put(
        authMiddleware,
        validate(userWordValidation.updateWordFromUserWordById),
        userWordController.updateWordFromUserWordById
    );
userWordRouter
    .route('/:userWordId/word/')
    .post(
        authMiddleware,
        validate(userWordValidation.addWordToUserWordById),
        userWordController.addWordToUserWordByIdController
    );

userWordRouter.route('/review-questions/:userWordId').get(userWordController.getReviewQuestion);
userWordRouter.route('/update-remember/:userWordId').put(userWordController.updateRememberWord);

module.exports = userWordRouter;
