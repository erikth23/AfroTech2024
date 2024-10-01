import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import * as zlib from 'zlib'; // For compressing data
import { DesignEval } from '../baml_client';

export interface Comment {
  comment: string;
  imageS3Uri: string;
  displayOrder: number;
  questionId: string;
  indexOfImageCommentedOn: number;
  createdAt: string;
}

export interface Response {
  roleId: string;
  canidateId: string;
  testId: string;
  status: 'Active' | 'Closed' | 'NotStarted';
  comments?: Comment[];
  evaluation?: DesignEval
  canidateData?: string;
}

export class ResponseDAO {
  private tableName: string;
  private dbClient: DynamoDBDocumentClient;

  constructor(client: DynamoDBClient, tableName: string) {
    this.dbClient = DynamoDBDocumentClient.from(client);
    this.tableName = tableName;
  }

  // Helper function to compress and encode data
  private compressData(data: any): string {
    const jsonData = JSON.stringify(data);
    const compressed = zlib.deflateSync(jsonData).toString('base64');
    return compressed;
  }

  // Helper function to decompress and decode data
  private decompressData(data: string): any {
    const buffer = Buffer.from(data, 'base64');
    const decompressed = zlib.inflateSync(buffer).toString();
    return JSON.parse(decompressed);
  }

  // Create a new test record
  async createResponse(record: Response): Promise<boolean> {
    const creationTime = new Date().toISOString();
    const updateTime = new Date().toISOString();

    // Compress non-key fields (comments, evaluation)
    const data = this.compressData({
      comments: record.comments,
      evaluation: record.evaluation,
      testId: record.testId,
      canidateData: record.canidateData,
    });

    console.log(record.canidateData)

    const params = {
      TableName: this.tableName,
      Item: {
        roleId: record.roleId,
        canidateId: record.canidateId,
        status: record.status,
        createdAt: creationTime,
        updatedAt: updateTime,
        data: data,
      },
    };
    console.log(params)

    try {
      await this.dbClient.send(new PutCommand(params));
      return true;
    } catch (error) {
      console.error(`Failed to create test record: ${error}`);
      return false;
    }
  }

  // Get a test record by roleId and canidateId
  async getResponse(roleId: string, canidateId: string): Promise<Response | null> {
    const params = {
      TableName: this.tableName,
      Key: {
        roleId,
        canidateId,
      },
    };

    try {
      const result = await this.dbClient.send(new GetCommand(params));
      if (result.Item) {
        const item = result.Item;
        const decompressedData = this.decompressData(item.data);
        return {
          roleId: item.roleId,
          canidateId: item.canidateId,
          status: item.status,
          testId: decompressedData.testId,
          comments: decompressedData.comments,
          evaluation: decompressedData.evaluation,
          canidateData: decompressedData.canidateData
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Failed to get test record: ${error}`);
      return null;
    }
  }

  // Update a test record
  async updateResponse(roleId: string, canidateId: string, record: Partial<Response>): Promise<boolean> {
    const updateTime = new Date().toISOString();

    // Compress the fields to be updated
    const data = this.compressData({
      testId: record.testId,
      comments: record.comments,
      evaluation: record.evaluation,
      canidateData: record.canidateData,
    });

    const params = {
      TableName: this.tableName,
      Key: {
        roleId,
        canidateId,
      },
      UpdateExpression: 'set #status = :status, #data = :data, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status',
        '#data': 'data',
      },
      ExpressionAttributeValues: {
        ':status': record.status,
        ':data': data,
        ':updatedAt': updateTime,
      },
    };

    try {
      await this.dbClient.send(new UpdateCommand(params));
      return true;
    } catch (error) {
      console.error(`Failed to update test record: ${error}`);
      return false;
    }
  }

  // Delete a test record
  async deleteResponse(roleId: string, candidateId: string): Promise<boolean> {
    const params = {
      TableName: this.tableName,
      Key: {
        roleId,
        candidateId,
      },
    };

    try {
      await this.dbClient.send(new DeleteCommand(params));
      return true;
    } catch (error) {
      console.error(`Failed to delete test record: ${error}`);
      return false;
    }
  }

  // Query all test records by roleId
  async getResponsesByRoleId(roleId: string): Promise<Response[] | null> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'roleId = :roleId',
      ExpressionAttributeValues: {
        ':roleId': roleId,
      },
    };

    try {
      const result = await this.dbClient.send(new QueryCommand(params));
      if (result.Items) {
        return result.Items.map((item) => {
          const decompressedData = this.decompressData(item.data);
          return {
            roleId: item.roleId,
            canidateId: item.canidateId,
            status: item.status,
            testId: decompressedData.testId,
            comments: decompressedData.comments,
            evaluation: decompressedData.evaluation,
            canidateData: decompressedData.canidateData
          };
        });
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Failed to query test records: ${error}`);
      return null;
    }
  }
}
