import { catchAsync } from "../utils/catchAsync";
import express from 'express';
import { S3UtilImpl } from "../utils/s3";

const uploadImage = catchAsync(async (req, res) => {
    try {
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }
    
        // Upload the image to S3
        const result = await S3UtilImpl.uploadImage(req.file);
        res.status(200).json({ message: 'Image uploaded successfully', data: result });
      } catch (error) {
        res.status(500).json({ message: 'Error uploading image', error: error.message });
      }
})

const getImage = catchAsync(async (req, res) => {
  const { s3Uri } = req.query;

  if (!s3Uri) {
    return res.status(400).json({ message: 'S3 URI is required' });
  }

  try {
    const image = await S3UtilImpl.getImage(s3Uri);

    res.setHeader('Content-Type', image.contentType);
    image.body.pipe(res);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving image', error: error.message });
  }
})

export default {
  getImage,
  uploadImage
}