// s3Util.js
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { config } from '../config/config';

// Configure the S3 client
export const s3Client = new S3Client({
  region: 'us-west-2', // Set your region
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  },
});