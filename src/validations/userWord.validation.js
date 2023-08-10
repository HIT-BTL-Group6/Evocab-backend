const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createUserWord = {
    body: Joi.object().keys({
        userId: Joi.string().custom(objectId).required(),
        words: Joi.array().items(Joi.object({
            wordId: Joi.string().custom(objectId).required(),
            isRemember: Joi.boolean().default(false),
        })).required(),
    }),
};

const getUserWords = {
    query: Joi.object().keys({
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getUserWordById = {
    params: Joi.object().keys({
        userWordId: Joi.string().custom(objectId).required(),
    }),
};

const updateUserWordById = {
    params: Joi.object().keys({
        userWordId: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object().keys({
        userId: Joi.string().custom(objectId).required(),
        words: Joi.array().items(Joi.object({
            wordId: Joi.string().custom(objectId).required(),
            isRemember: Joi.boolean(),
        })).min(1),
    }),
};

const addWordToUserWordById = {
    params: Joi.object().keys({
        userWordId: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
        wordId: Joi.string().custom(objectId).required(),
        isRemember: Joi.boolean().default(false),
    }),
};

const deleteWordFromUserWordById = {
    params: Joi.object().keys({
        userWordId: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object().keys({
        wordId: Joi.string().custom(objectId).required(),
    }),
};

const deleteUserWordById = {
    params: Joi.object().keys({
        userWordId: Joi.string().custom(objectId).required(),
    }),
};
const updateWordFromUserWordById = {
    params: Joi.object().keys({
        userWordId: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object().keys({
        wordId: Joi.string().custom(objectId).required(),
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
    updateWordFromUserWordById
};
