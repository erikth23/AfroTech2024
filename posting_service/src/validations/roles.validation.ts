import Joi from 'joi'

const getRoles = {
    body: Joi.object().keys({
        organizationId: Joi.string().required()
    })
}

const getRole = {
    body: Joi.object().keys({
        roleId: Joi.object().keys({
            organizationId: Joi.string().required(),
            hash: Joi.string().required()
        }),
    })
}

const putRole = {
    body: Joi.object().keys({
        organizationId: Joi.string().required(),
        title: Joi.string().required(),
        canidates: Joi.array().items(Joi.string())
    })
}

const addCanidates = {
    body: Joi.object().keys({
        roleId: Joi.object().keys({
            organizationId: Joi.string().required(),
            hash: Joi.string().required()
        }),
        canidates: Joi.array().items(Joi.string())
    })
}

const getCanidates = {
    body: Joi.object().keys({
        roleId: Joi.object().keys({
            organizationId: Joi.string().required(),
            hash: Joi.string().required()
        }),
    })
}

const getCanidateEvaluation = {
    body: Joi.object().keys({
        roleId: Joi.object().keys({
            organizationId: Joi.string().required(),
            hash: Joi.string().required()
        }),
        canidateId: Joi.string().required()
    })
}

export default {
    getRoles,
    getRole,
    putRole,
    addCanidates,
    getCanidates,
    getCanidateEvaluation
}