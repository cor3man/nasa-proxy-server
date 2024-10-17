const Joi = require('joi');

const roverSchema = Joi.object({
    userId: Joi.string().required(),
    userName: Joi.string().required(),
    userApiKey: Joi.string().required(),
});

module.exports = roverSchema;