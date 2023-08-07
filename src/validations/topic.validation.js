const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTopic = {
    body: Joi.object().keys({
        nameTopic: Joi.string().required(),
        words: Joi.array().items(Joi.string().custom(objectId)),
    }),
};

const getTopics = {
    query: Joi.object().keys({
        nameTopic:Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getTopicById = {
    params: Joi.object().keys({
        topicId: Joi.string().custom(objectId),
    }),
};

const updateTopicById = {
    params: Joi.object().keys({
        topicId: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object().keys({
        nameTopic: Joi.string().required(),
        words: Joi.array().items(Joi.string().custom(objectId)).min(1),
    }).min(1)
};

const deleteTopicById = {
    params: Joi.object().keys({
        topicId: Joi.string().custom(objectId),
    }),
};

const addWordToTopicById = {
    params: Joi.object().keys({
        topicId: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object().keys({
        words: Joi.array().items(Joi.string().custom(objectId))
    })
};

const deleteWordFromTopicById = {
    params: Joi.object().keys({
        topicId: Joi.string().custom(objectId).required(),
        wordId: Joi.string().custom(objectId),
    }),
    
};

module.exports = {
    createTopic,
    getTopics,
    getTopicById,
    updateTopicById,
    deleteTopicById,
    addWordToTopicById,
    deleteWordFromTopicById,
};
