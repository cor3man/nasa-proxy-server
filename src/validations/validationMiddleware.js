const Joi = require('joi');
const CustomException = require('../errors/CustomException');

const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return next(new CustomException(400, error.details[0].message));
        }
        next();
    };
};

module.exports = validateSchema;
