const Joi = require("joi");

const publicGetTests = {}

const publicGetTest = {
    query: Joi.object().keys({
        id: Joi.string().required()
    })
}

module.exports = {
    publicGetTest,
    publicGetTests
}