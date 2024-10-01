import { config } from "../config/config";

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

export const getDynamoDBClient = () => {
    return new DynamoDBClient({
        region: "us-west-2",
        credentials: {
          accessKeyId: "AKIA6GBMHNUF4UR2DC7T",
          secretAccessKey: config.secretAccessKey,
        }
    });
}