const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { default: axios } = require("axios");
const config = require("../config/config")

const getPublicCanidates = catchAsync(async (req, res) => {
    const response = await axios.post(`${config.psEndpoint}/v1/roles/id/canidates`, {
        "roleId": {
            "organizationId": "default",
            "hash": "default"
        }
    })

    const responseData = response.data
    const result = responseData["Closed"]

    result.forEach(response => {
        if (response.canidateData) {
            try {
                response.canidateData = JSON.parse(response.canidateData)
            } catch (e) {
                console.error(`Failed to parse canidateDate: ${e}`)
            }
        } 
    });

    res.status(httpStatus.OK).send(result)
})

module.exports = {
    getPublicCanidates
}