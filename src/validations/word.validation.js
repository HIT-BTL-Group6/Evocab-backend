const Joi = require('joi');
const { objectId } = require('./custom.validation');

const wordValidation = {
    createWord: Joi.object().keys({
        word: Joi.string().required(),
        example: Joi.string().required(),
        sound: Joi.string().required(),
        pronunciation: Joi.string().required(),
        image: Joi.string().required(),
        vietnamese: Joi.string().required(),
        nameTopic: Joi.string().required(),
    }),

    getWords: Joi.object().keys({
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
                sound: Joi.string(),
                pronunciation: Joi.string(),
                image: Joi.string(),
                vietnamese: Joi.string(),
                nameTopic: Joi.string().required()
            })
            .min(1),
    }),

    deleteWord: Joi.object().keys({
        wordId: Joi.string().custom(objectId).required(),
    }),
};

module.exports = wordValidation;
