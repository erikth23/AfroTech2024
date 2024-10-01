const httpStatus = require("http-status")
const catchAsync = require("../utils/catchAsync")
const { default: axios } = require("axios")
const config = require("../config/config")

const getTests = catchAsync(async (req, res) => {
    const response = await axios.get(`${config.psEndpoint}/v1/test/`)

    res.status(httpStatus.OK).send(response.data)
})

const getTest = catchAsync(async (req, res) => {
    const response = await axios.post(`${config.psEndpoint}/v1/test/id`, {
        "id": req.params.id
    })
    console.log(response)

    res.status(httpStatus.OK).send(response.data)
})

module.exports = {
    getTest,
    getTests
}