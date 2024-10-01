const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { default: axios } = require("axios");
const config = require("../config/config");

const analyze = catchAsync(async (req, res) => {
    const result = await axios.post(`${config.shsEndpoint}/v1/test/design`, req.body)

    res.status(httpStatus.OK).send(result.data)
})

const publicAnalyze = catchAsync(async (req, res) => {
    const requestBody = req.body

    const shsRequest = {
        canidateId: requestBody.email,
        roleId: "default::default",
        testId: "1",
        comments: requestBody.comments,
        status: 'Closed',
        canidateData: JSON.stringify(requestBody.userData),
    }

    const result = await axios.post(`${config.shsEndpoint}/v1/test/design`, shsRequest)

    res.status(httpStatus.OK).send(result.data)
})

module.exports = {
    analyze,
    publicAnalyze
}