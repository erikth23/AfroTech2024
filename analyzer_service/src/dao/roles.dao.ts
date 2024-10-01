import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

export function generateRandomId(): string {
  return uuidv4();
}

export interface Role {
  "organization-id": string;
  "role-id": string;
  testId: string;
  canidates: string[]
}

export class RoleDAO {
  private tableName: string;
  private dbClient: DynamoDBDocumentClient;

  constructor(client: DynamoDBClient, tableName: string) {
    this.dbClient = DynamoDBDocumentClient.from(client)
    this.tableName = tableName;
  }

  private encodeData(data: any): string {
    const jsonData = JSON.stringify(data)
    return Buffer.from(jsonData).toString('base64');
  }

  private decodedData(data: string): any {
    return JSON.parse(Buffer.from(data, 'base64').toString('utf-8'))
  }

  async getRole(organizationId: string, roleId: string): Promise<Role | null> {
    const params = {
      TableName: this.tableName,
      Key: {
        "organization-id": organizationId,
        "role-id": roleId,
      },
    };

    try {
      const result = await this.dbClient.send(new GetCommand(params));
      if (result.Item) {
        const item = result.Item;
        const decodedData = this.decodedData(item.data)
        return {
            "role-id": item["role-id"],
            "organization-id": item["canidate-id"],
            testId: decodedData.testData,
            canidates: decodedData.canidates
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Failed to get role: ${error}`);
      return null;
    }
  }
}