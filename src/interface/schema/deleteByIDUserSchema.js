const Joi = require('joi');

const deleteByIDUserSchema = Joi.object().keys({
    params: Joi.object().keys({
        userId: Joi.string().required()
    })
});

module.exports = deleteByIDUserSchema;
