const Joi = require('joi');
// Middleware for validating request body using Joi schemas
const validateBody = (schema) => {
    return (req, res, next) => {
        const body = req.body;
        const { error } = schema.validate(body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    }
}
// Middleware for validating request parameters using Joi schemas
const validateParams = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.params);
        if (error) {
            return res.status(400).json({ message: error.details[0].message});
        }
        next();
    };
};
// Joi schema for validating userId parameter
const userIdParamSchema = Joi.object({
    userId: Joi.number().integer().positive().required()
});
// Joi schemas for validating user registration and prompt creation
const userRegistrationSchema = Joi.object({
    name: Joi.string().min(2).required(),
    phone: Joi.string().pattern(/^\+?[0-9]{9,15}$/).required(),
});
// Joi schema for validating prompt creation
const promptSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    categoryId: Joi.number().integer().positive().required(),
    subCategoryId: Joi.number().integer().positive().required(),
    prompt: Joi.string().min(3).required()
});
module.exports = { validateBody, validateParams, userRegistrationSchema, promptSchema, userIdParamSchema };

