const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createWord = {
    body: Joi.object().keys({
        word: Joi.string().required(),
        example: Joi.string().required(),
        pronunciation: Joi.string().required(),
        image: Joi.string(),
        vietnamese: Joi.string().required(),
        wordType: Joi.string().required(),
        topicId: Joi.string().required(),
    }),
};

const getWords = {
    query: Joi.object().keys({
        wordType: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getWord = {
    params: Joi.object().keys({
        wordId: Joi.string().custom(objectId),
    }),
};

const updateWord = {
    params: Joi.object().keys({
        wordId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            word: Joi.string(),
            example: Joi.string(),
            pronunciation: Joi.string(),
            image: Joi.string(),
            vietnamese: Joi.string(),
            wordType: Joi.string(),
            topicId: Joi.string(),
        })
        .min(1),
};

const deleteWord = {
    params: Joi.object().keys({
        wordId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createWord,
    getWords,
    getWord,
    updateWord,
    deleteWord,
};
