const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const wordValidation = require('../../validations/word.validation');
const wordController = require('../../controllers/word.controller');
const upload = require('../../middlewares/upload.middleware');
const wordRouter = express.Router();

wordRouter
    .route('/')
    .post(upload.single('image'), validate(wordValidation.createWord), wordController.createWord)
    .get(validate(wordValidation.getWords), wordController.getWords);

wordRouter
    .route('/:wordId')
    .get(validate(wordValidation.getWord), wordController.getWord)
    .put(wordController.updateWord)
    .delete(validate(wordValidation.deleteWord), wordController.deleteWord);

module.exports = wordRouter;
