const Joi = require("joi");

 const analyze = {
    body: Joi.object().keys({
        canidateId: Joi.string().required(),
        roleId: Joi.string().required(),
        testId: Joi.string().required(),
        comments: Joi.array().items(Joi.object().keys({
            imageS3Uri: Joi.string().required(),
            questionId: Joi.string().required(),
            displayOrder: Joi.number().required(),
            comment: Joi.string().required(),
            indexOfImageCommentedOn: Joi.number().required(),
            createdAt: Joi.string().required()
        })).min(1),
        status: Joi.string().required().valid('Active', 'Closed', 'NotStarted')
    })
 }

 const publicAnalyze = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        createdAt: Joi.string().required(),
        comments: Joi.array().items(Joi.object().keys({
            imageS3Uri: Joi.string(),
            questionId: Joi.string().required(),
            displayOrder: Joi.number().required(),
            comment: Joi.string().required(),
            indexOfImageCommentedOn: Joi.number().required(),
            createdAt: Joi.string().required()
        })).min(1),
        userData: Joi.object().keys({
            preferredName: Joi.string().required(),
            role: Joi.string(),
            seniority: Joi.string(),
            currentCompany: Joi.string(),
            country: Joi.string(),
        })
    })
 }

 module.exports = {
    analyze,
    publicAnalyze
 }