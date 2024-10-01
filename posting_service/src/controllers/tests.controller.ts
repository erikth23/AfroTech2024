import { catchAsync } from "../utils/catchAsync";
import { getDynamoDBClient } from "../clients/ddb";
import httpStatus from "http-status";
import { TestDAO } from "../dao/tests.dao";

const testDao = new TestDAO(getDynamoDBClient(), "Tests")

const getTests = catchAsync(async (req: any, res: any) => {
    let tests = []

    for (let i = 1; i < 10; i++) {
        const test = await testDao.getTest(i.toString())

        if (test) {
            tests.push(test)
        }
    }

    res.status(httpStatus.OK).send(tests)
})

const getTest = catchAsync(async (req: any, res: any) => {
    const test = await testDao.getTest(req.body.id)

    res.status(httpStatus.OK).send(test)
})

export default {
    getTests,
    getTest
}