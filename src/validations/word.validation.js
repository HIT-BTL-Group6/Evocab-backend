const Joi = require('joi');
const { objectId } = require('./custom.validation');

const wordValidation = {
    createWord: Joi.object().keys({
        word: Joi.string().required(),
        example: Joi.string().required(),
        pronunciation: Joi.string().required(),
        image: Joi.string(),
        vietnamese: Joi.string().required(),
        wordType: Joi.string().required(),
        topicId: Joi.string().custom(objectId).required(),
    }),

    getWords: Joi.object().keys({
        wordType: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),

    getWord: Joi.object().keys({
        wordId: Joi.string().custom(objectId).required(),
    }),

    updateWord: Joi.object().keys({
        wordId: Joi.string().custom(objectId).required(),
        body: Joi.object()
            .keys({
                word: Joi.string(),
                example: Joi.string(),
                pronunciation: Joi.string(),
                image: Joi.string(),
                vietnamese: Joi.string(),
                wordType: Joi.string(),
                topicId: Joi.string().custom(objectId).required(),
            })
            .min(1),
    }),

    deleteWord: Joi.object().keys({
        wordId: Joi.string().custom(objectId).required(),
    }),
};

module.exports = wordValidation;
