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
    .get(
        authMiddleware,
        roles('admin'),
        validate(userWordValidation.getUserWords),
        userWordController.getUserWordsController
    );

userWordRouter
    .route('/:userWordId')
    .get(authMiddleware, roles('admin'), validate(userWordValidation.getUserWordById), userWordController.getUserWordById)
    .put(
        authMiddleware,
        roles('admin'),
        validate(userWordValidation.updateUserWordById),
        userWordController.updateUserWordById
    )
    .delete(
        authMiddleware,
        roles('admin'),
        validate(userWordValidation.deleteUserWordById),
        userWordController.deleteUserWordById
    );
userWordRouter
    .route('/:user-word/word/:wordId')
    .delete(
        authMiddleware,
        roles('admin'),
        validate(userWordValidation.deleteWordFromUserWordById),
        userWordController.deleteWordFromUserWordByIdController
    );
userWordRouter
    .route('/:userWordId/word/')
    .post(
        authMiddleware,
        roles('admin'),
        validate(userWordValidation.addWordToUserWordById),
        userWordController.addWordToUserWordByIdController
    );
module.exports = userWordRouter;

