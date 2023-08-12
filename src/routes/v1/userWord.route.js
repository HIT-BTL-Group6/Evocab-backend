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
    .post(roles('admin'), validate(userWordValidation.createUserWord), userWordController.createUserWord)
    .get(roles('admin'), validate(userWordValidation.getUserWords), userWordController.getUserWordsController);

userWordRouter
    .route('/get-me/:userId')
    .get(validate(userWordValidation.getUserWordById), userWordController.getMeById);
userWordRouter
    .route('/:userId')
    .get(validate(userWordValidation.getUserWordById), userWordController.getUserWordById)
    .put(validate(userWordValidation.updateUserWordById), userWordController.updateUserWordById)
    .delete(validate(userWordValidation.deleteUserWordById), userWordController.deleteUserWordById);
userWordRouter
    .route('/delete-word/:userId')
    .delete(
        validate(userWordValidation.deleteWordFromUserWordById),
        userWordController.deleteWordFromUserWordByIdController
    );
userWordRouter
    .route('/add-word/:userId')
    .post(validate(userWordValidation.addWordToUserWordById), userWordController.addWordToUserWordByIdController);
userWordRouter.route('/remember-word/:userId').get(userWordController.getRememberUserWords);
userWordRouter.route('/not-remember-word/:userId').get(userWordController.getNotRememberUserWords);
userWordRouter
    .route('/update-word/:userId')
    .put(validate(userWordValidation.updateWordFromUserWordById), userWordController.updateWordFromUserWordById);
userWordRouter.route('/review-questions/:userWordId').get(userWordController.getReviewQuestion);
userWordRouter.route('/update-remember/:userWordId').put(userWordController.updateRememberWord);
module.exports = userWordRouter;
