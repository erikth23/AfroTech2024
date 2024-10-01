import { config } from "../config/config";

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

export const dynamoDBClient = new DynamoDBClient({
  region: "us-west-2",
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  }
});