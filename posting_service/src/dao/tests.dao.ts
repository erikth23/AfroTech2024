import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import * as zlib from 'zlib'; // For compressing data

export interface Question {
  imageUris: string[];
  id: string;
  question: string;
  context: string;
}

export interface Test {
  id: string;
  questions: Question[];
}

export class TestDAO {
  private tableName: string;
  private dbClient: DynamoDBDocumentClient;

  constructor(client: DynamoDBClient, tableName: string) {
    this.dbClient = DynamoDBDocumentClient.from(client);
    this.tableName = tableName;
  }

  // Helper function to compress data
  private compressData(data: any): string {
    const jsonData = JSON.stringify(data);
    const compressed = zlib.gzipSync(jsonData).toString('base64');
    return compressed;
  }

  // Helper function to decompress data
  private decompressData(data: string): any {
    const decompressed = zlib.gunzipSync(Buffer.from(data, 'base64')).toString('utf-8');
    return JSON.parse(decompressed);
  }

  // Create a new test entry
  async createTest(questions: Question[]): Promise<boolean> {
    const compressedData = this.compressData({ questions });
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const params = {
      TableName: this.tableName,
      Item: {
        id: 
        createdAt,
        updatedAt,
        data: compressedData, // Store compressed data in the 'data' field
      },
    };

    try {
      await this.dbClient.send(new PutCommand(params));
      return true;
    } catch (error) {
      console.error(`Failed to create test: ${error}`);
      return false;
    }
  }

  // Get a test by id
  async getTest(id: string): Promise<Test | null> {
    const params = {
      TableName: this.tableName,
      Key: {
        id,
      },
    };

    try {
      const result = await this.dbClient.send(new GetCommand(params));
      if (result.Item) {
        return {
          id: result.Item.id,
          questions: result.Item.questions,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Failed to get test: ${error}`);
      return null;
    }
  }

  // Update a test's questions
  async updateTest(id: string, questions: Question[]): Promise<Test | null> {
    const compressedData = this.compressData({ questions });
    const updatedAt = new Date().toISOString();

    const params = {
      TableName: this.tableName,
      Key: {
        id,
      },
      UpdateExpression: 'set #data = :data, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#data': 'data',
      },
      ExpressionAttributeValues: marshall({
        ':data': compressedData,
        ':updatedAt': updatedAt,
      }),
    };

    try {
      const result = await this.dbClient.send(new UpdateCommand(params));
      if (result.Attributes) {
        const updatedTestData = unmarshall(result.Attributes);
        const decompressedData = this.decompressData(updatedTestData.data);
        return {
          id: updatedTestData.id,
          questions: decompressedData.questions,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Failed to update test: ${error}`);
      return null;
    }
  }

  // Delete a test
  async deleteTest(id: string): Promise<boolean> {
    const params = {
      TableName: this.tableName,
      Key: {
        id,
      },
    };

    try {
      await this.dbClient.send(new DeleteCommand(params));
      return true;
    } catch (error) {
      console.error(`Failed to delete test: ${error}`);
      return false;
    }
  }
}
