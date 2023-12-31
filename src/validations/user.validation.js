const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().custom(password).required(),
        role: Joi.string().valid('user', 'admin'),
        age: Joi.number(),
        username: Joi.string().required(),
        gender: Joi.string().valid('male', 'female'),
        topicId: Joi.custom(objectId),
        isActive: Joi.string(),
        avatar: Joi.string(),
    }),
};

const getUsers = {
    query: Joi.object().keys({
        username: Joi.string(),
        email: Joi.string(),
        role: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
};

const updateUser = {
    params: Joi.object().keys({
        userId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            email: Joi.string().email(),
            password: Joi.string().custom(password),
            role: Joi.string().valid('user', 'admin'),
            age: Joi.number(),
            username: Joi.string(),
            gender: Joi.string().valid('male', 'female'),
            topicId: Joi.custom(objectId),
            isActive: Joi.string(),
            avatar: Joi.string(),
        })
        .min(1),
};

const deleteUser = {
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
