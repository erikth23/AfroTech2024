import Joi from 'joi';

const saveAssessment = {
    body: Joi.object().keys({
        canidateId: Joi.string().required().email(),
        roleId: Joi.string().required(),
        testId: Joi.string().required(),
        comments: Joi.array().items(Joi.object().keys({
            imageS3Uri: Joi.string(),
            questionId: Joi.string().required(),
            displayOrder: Joi.number().required(),
            comment: Joi.string().required(),
            indexOfImageCommentedOn: Joi.number().required(),
            createdAt: Joi.string().required(),
        })).min(1),
        status: Joi.string().required().valid('Active', 'Closed', 'NotStarted'),
        canidateData: Joi.string(),
    })
}

export default { saveAssessment }