import { config } from "../config/config";

import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import stream from 'stream'

// Configure AWS SDK v3
const s3Client = new S3Client({
  region: 'us-west-2',
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  }
});

const S3_BUCKET = "user-screenshots-v1";

class S3Util {
  async uploadImage(file) {
    let fileKey = `${uuidv4()}-${file.originalname}`;

    if (!fileKey.endsWith(".png")) {
      fileKey = fileKey + ".png"
    }

    const params = {
      Bucket: S3_BUCKET,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    try {
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      const s3URI = `s3://${S3_BUCKET}/${fileKey}`;
      return {
        key: fileKey,
        uri: s3URI,
      };
    } catch (err) {
      throw new Error(`Failed to upload image: ${err.message}`);
    }
  }

  async getImage(s3Uri) {
    try {
      const { bucketName, key } = this.parseS3Uri(s3Uri)

      const params = {
        Bucket: bucketName,
        Key: key,
      };

      const command = new GetObjectCommand(params);
      const data = await s3Client.send(command)

      const dataStream = new stream.PassThrough();
      data.Body.pipe(dataStream);

      return {
        contentType: data.ContentType,
        body: dataStream,
      };
    } catch (err) {
      throw new Error("Failed to retrieve image from S3")
    }
  }

  parseS3Uri(s3Uri) {
    if (!s3Uri.startsWith("s3://")) {
      throw new Error("Invalid S3 URI. It must start with 's3://'.");
    }

    const uriParts = s3Uri.slice(5).split("/");
    if (uriParts.length < 2) {
      throw new Error("Invalid S3 URI. It must include both bucket and key.");
    }

    const bucketName = uriParts[0];
    const key = uriParts.slice(1).join("/");

    return { bucketName, key };
  }
}

const S3UtilImpl = new S3Util()

export {
    S3UtilImpl
}
