const Joi = require('joi');

const loginAuthSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = loginAuthSchema;
