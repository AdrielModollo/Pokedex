const Joi = require('joi');

const updateUserSchema = Joi.object().keys({
    params: Joi.object().keys({
        userId: Joi.string().required()
    }),
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
});

module.exports = updateUserSchema;
