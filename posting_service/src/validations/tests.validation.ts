import Joi from 'joi'

const getTests = {}

const getTest = {
    body: Joi.object().keys({
        id: Joi.string().required()
    })
}

export default {
    getTests,
    getTest
}