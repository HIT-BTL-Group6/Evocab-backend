const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createUserWord = {
    body: Joi.object().keys({
        userId: Joi.string().custom(objectId).required(),
        words: Joi.array().items(Joi.string().custom(objectId)).required(),
    }),
};

const getUserWords = {
    query: Joi.object().keys({
        wordType: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getUserWordById = {
    params: Joi.object().keys({
        userWordId: Joi.string().custom(objectId),
    }),
};

const updateUserWordById = {
    params: Joi.object().keys({
        userWordId: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
        userId: Joi.string().custom(objectId),
        words: Joi.array().items(Joi.string().custom(objectId)),
    }),
};

const addWordToUserWordById = {
    params: Joi.object().keys({
        userWordId: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
        words: Joi.array().items(Joi.string().custom(objectId)),
    }),
};

const deleteWordFromUserWordById = {
    params: Joi.object().keys({
        userWordId: Joi.string().custom(objectId),
        wordId: Joi.string().custom(objectId)
    }),
};

const deleteUserWordById = {
    params: Joi.object().keys({
        userWordId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createUserWord,
    getUserWords,
    getUserWordById,
    updateUserWordById,
    addWordToUserWordById,
    deleteWordFromUserWordById,
    deleteUserWordById,
};
