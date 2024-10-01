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
  title: string;
  testId: string;
  canidates?: string[];
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

  async createRole(record: Role): Promise<boolean> {
    const binaryData = this.encodeData({
      title: record.title,
      testId: record.testId,
      canidates: record.canidates
    });
    const creationTime = new Date().toISOString();
    const timeStamp = new Date().toISOString();

    const params = {
      TableName: this.tableName,
      Item: {
        "organization-id": record['organization-id'],
        "role-id": "default",
        creationTime,
        timeStamp,
        data: binaryData,
      },
    };

    try {
      await this.dbClient.send(new PutCommand(params));
      return true;
    } catch (error) {
      console.error(`Failed to create role: ${error}`);
      return false;
    }
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
            title: decodedData.title,
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

  async updateRole(organizationId: string, roleId: string, record: Role): Promise<Role | null> {
    const binaryData = this.encodeData({
      testId: record.testId,
      canidates: record.canidates
    })

    const params = {
      TableName: this.tableName,
      Key: {
        "organization-id": organizationId,
        "role-id": roleId,
      },
      UpdateExpression: 'set #data = :data',
      ExpressionAttributeNames: {
        '#data': 'data',
      },
      ExpressionAttributeValues: {
        ':data': binaryData,
      },
    };

    try {
      const result = await this.dbClient.send(new UpdateCommand(params));
      if (result.Attributes) {
        return record;
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Failed to update role: ${error}`);
      return null;
    }
  }

  async deleteRole(organizationId: string, roleId: string): Promise<boolean> {
    const params = {
      TableName: this.tableName,
      Key: {
        "organization-id": organizationId,
        "role-id": roleId,
      },
    };

    try {
      await this.dbClient.send(new DeleteCommand(params));
      return true;
    } catch (error) {
      console.error(`Failed to delete role: ${error}`);
      return false;
    }
  }

  async getRolesByOrganizationId(organizationId: string): Promise<Role[] | null> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: '#orgId = :orgIdVal',
      ExpressionAttributeNames: {
        '#orgId': 'organization-id',
      },
      ExpressionAttributeValues: {
        ':orgIdVal': organizationId,
      },
    };

    try {
      const result = await this.dbClient.send(new QueryCommand(params));
      if (result.Items) {
        return result.Items.map((item) => {
          const decodedData = this.decodedData(item.data)
          return {
            "organization-id": organizationId,
            "role-id": item["role-id"],
            title: decodedData.title,
            canidates: decodedData.canidates,
            testId: decodedData.testId,
          }
        });
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Failed to query roles by organizationId: ${error}`);
      return null;
    }
  }
}
