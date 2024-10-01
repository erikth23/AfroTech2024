import httpStatus from "http-status";
import { DesignAssessor } from "../experts/agents/designassessor";
import { catchAsync } from "../utils/catchAsync";
import { Response, ResponseDAO } from "../dao/responses.dao";
import { dynamoDBClient } from "../clients/ddb";

const saveAssessment = catchAsync(async (req, res) => {
    console.log(req.body);

    const assessor = await DesignAssessor.create()
    const responseDao = new ResponseDAO(dynamoDBClient, 'canidate-responses')

    let newResponse: Response = req.body;
    let { roleId, canidateId } = newResponse
    let currResponse: Response = await responseDao.getResponse(roleId, canidateId)

    if (newResponse.status == 'Closed') {
        newResponse = await assessor.analyzeTestV2(req.body)
    }

    if (currResponse) {
        responseDao.updateResponse(roleId, canidateId, newResponse)
    } else {
        responseDao.createResponse(newResponse)
    }

    res.status(httpStatus.OK).send(newResponse)
})

export default {
    saveAssessment
}