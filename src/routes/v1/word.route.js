const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const wordValidation = require('../../validations/word.validation');
const wordController = require('../../controllers/word.controller')
const authMiddleware = require('../../middlewares/auth.middleware');
const roles = require('../../middlewares/role.middleware');
const upload = require('../../middlewares/upload.middleware');
const wordRouter = express.Router();
wordRouter.use(authMiddleware);

wordRouter
    .route('/')
    .post(
        upload.fields([{ name: 'image' }, { name: 'sound' }]),
        validate(wordValidation.createWord),
        wordController.createWord
    )
    .get(
        validate(wordValidation.getWords),
        wordController.getWords)

wordRouter
    .route('/:wordId')
    .get(
        validate(wordValidation.getWord),
        wordController.getWord
    )
    .put(
        roles('admin'),
        wordController.updateWord
    )
    .delete(
        roles('admin'),
        validate(wordValidation.deleteWord),
        wordController.deleteWord
    );

module.exports = wordRouter;