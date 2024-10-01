import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import * as zlib from 'zlib'; // For compressing data

export interface Comment {
  comment: string;
  imageS3Uri: string;
  displayOrder: number;
  questionId: string;
}

export interface SpecificCriteria {
  criteria: string;
  score: number;
  comment: string;
}

export interface Evaluation {
  overallScore: number;
  overallComment: string;
  specificCriteria: SpecificCriteria[];
}

export interface Response {
  roleId: string;
  canidateId: string;
  testId: string;
  status: 'Active' | 'Closed' | 'NotStarted';
  comments?: Comment[];
  evaluation?: Evaluation;
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

  // Get a test record by roleId and candidateId
  async getResponse(roleId: string, candidateId: string): Promise<Response | null> {
    const params = {
      TableName: this.tableName,
      Key: {
        roleId,
        candidateId,
      },
    };

    try {
      const result = await this.dbClient.send(new GetCommand(params));
      if (result.Item) {
        const item = unmarshall(result.Item);
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