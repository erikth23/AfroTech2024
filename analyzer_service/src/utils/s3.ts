import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs';


export default class S3Util {
    private client: S3Client;

    constructor(client: S3Client) {
        this.client = client
    }

    /**
    * Upload a Markdown string to an S3 bucket.
    * @param {string} markdownString - The content to be saved as a Markdown file.
    * @param {string} bucketName - The name of the S3 bucket.
    * @param {string} s3Key - The key (filename) in the S3 bucket.
    * @returns {Promise} - A promise that resolves with the upload data or rejects with an error.
    */
    async uploadMarkdownToS3 (markdownString, bucketName, s3Key) {
       // Path to save the Markdown file locally (temporary)
       const filePath = './temp.md';
    
       // Write the string to a Markdown file
       fs.writeFileSync(filePath, markdownString);
    
       // Read the file to upload
       const fileContent = fs.readFileSync(filePath);
    
       // S3 upload parameters
       const uploadParams = {
         Bucket: bucketName,
         Key: s3Key,
         Body: fileContent,
         ContentType: 'text/markdown',
       };
    
       try {
         const data = await this.client.send(new PutObjectCommand(uploadParams));
         console.log('File uploaded successfully:', data);
        
         // Clean up the local file after upload
         fs.unlinkSync(filePath);
        
         return data;
       } catch (err) {
         console.error('Error uploading file:', err);
         throw err;
       }
    };

    async getPresignedUrl(s3Uri, expiresIn = 3600) {
      try {
        const { bucketName, key } = this.parseS3Uri(s3Uri);
        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: key,
        });
  
        // Generate the presigned URL
        const url = await getSignedUrl(this.client, command, { expiresIn });

        console.log(url)
  
        return url;
      } catch (error) {
        console.error("Error generating presigned URL:", error);
        throw error;
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
