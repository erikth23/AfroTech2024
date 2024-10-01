import { RoleDAO, TestDAO } from "../../dao";
import S3Util from '../../utils/s3'
import { dynamoDBClient } from "../../clients/ddb";
import { s3Client } from "../../clients/s3";
import { Comment as bamlComment, b, Question as bamlQuestion, CanidateResponse } from "../../baml_client"
import { Comment, Response } from "../../dao/responses.dao";
import { Image } from "@boundaryml/baml"
import { Question } from "../../dao/tests.dao";

class DesignAssessor {
    testDAO: TestDAO
    roleDAO: RoleDAO
    s3Util: S3Util

    static async create(): Promise<DesignAssessor> {
        return new this()
    }

    constructor() {
        this.testDAO = new TestDAO(dynamoDBClient, "Tests")
        this.s3Util = new S3Util(s3Client)
    }

    async analyzeTestV2(response: Response): Promise<Response> {
        const test = await this.testDAO.getTest(response.testId)
        if (!test) {
            throw new ReferenceError(`Test with id ${response.testId} does not exist`)
        }

        const canidateResponse: CanidateResponse = {
            name: response.canidateData ? JSON.parse(response.canidateData).preferredName : "",
            comments: await Promise.all(response.comments.map(async c => await this.convertToBamlComment(c))),
        }

        const questions = await Promise.all(test.questions.map(async q => await this.convertToBamlQuestion(q)))

        response.evaluation = await b.AnalyzeAssessment(canidateResponse, questions)

        return response
    }

    async convertToBamlComment(comment: Comment): Promise<bamlComment> {
        let result: bamlComment = {
            comment: comment.comment,
            questionId: comment.questionId,
            indexOfImageCommentedOn: comment.indexOfImageCommentedOn
        }

        if (comment.imageS3Uri) {
            result.capturedImage = await this.convertUriToImage(comment.imageS3Uri)
        }

        return result
    }

    async convertToBamlQuestion(question: Question): Promise<bamlQuestion> {
        return {
            id: question.id,
            question: question.question,
            images: await Promise.all(question.imageUris.map(async (uri) => await this.convertUriToImage(uri))),
            context: question.context
        }
    }

    async convertUriToImage(uri: string): Promise<Image>  {
        const url = uri.startsWith("s3://") ? await this.s3Util.getPresignedUrl(uri) : uri
        return Image.fromUrl(url)
    }
}

export {
    DesignAssessor
}