const axios = require("axios");
const FormData = require('form-data');
const config = require("../config/config");
const catchAsync = require("../utils/catchAsync");
const stream = require('stream')

const uploadImage = catchAsync(async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
    
      const result = await forwardFileToAnotherService(req.file);
      console.log(result)
      res.status(200).json({
        message: 'File forwarded successfully',
        result: result.data, // Return the response from the other service
      });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
})

async function forwardFileToAnotherService(file) {
    // Create a FormData object to send the file to the destination service
    const formData = new FormData();
    formData.append('image', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });
  
    // Send the file using axios to another service
    const response = await axios.put(`${config.imageServiceEndpoint}/v1/image/upload`, formData, {
      headers: {
        ...formData.getHeaders(),
        'Content-Length': formData.getLengthSync(), // Ensure proper content length
      },
    });
  
    return response; // Return the response from the destination service
  }

const getImage = catchAsync(async (req, res) => {
    const { s3Uri } = req.query

    const result = await axios.get(`${config.imageServiceEndpoint}/v1/image?s3Uri=${s3Uri}`, {
        responseType: 'stream',
    })

    res.setHeader('Content-Type', result.headers['content-type']);
    result.data.pipe(res);
})

module.exports = { getImage, uploadImage }