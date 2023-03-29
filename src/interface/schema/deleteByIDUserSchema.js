const Joi = require('joi');

const deleteByIDUserSchema = Joi.object().keys({
    params: Joi.object().keys({
        userId: Joi.number().integer().positive().required()
    })
});

module.exports = deleteByIDUserSchema;
