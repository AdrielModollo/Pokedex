const Joi = require('joi');

const getByIDUserSchema = Joi.object().keys({
    params: Joi.object().keys({
        userId: Joi.string().required()
    })
});

module.exports = getByIDUserSchema;
