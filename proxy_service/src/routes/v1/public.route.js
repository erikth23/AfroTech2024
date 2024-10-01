const express = require("express");
const validate = require('../../middlewares/validate');
const multer = require('multer');
const { answersValidation, canidatesValidation, testValidation } = require("../../validations");
const { answersController, canidateController, testController, imageController } = require("../../controllers");

const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage(), // Store file in memory before uploading
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
  });

router.post('/analyze', validate(answersValidation.publicAnalyze), answersController.publicAnalyze)
router.get('/canidates', validate(canidatesValidation.getCanidates), canidateController.getPublicCanidates)
router.get('/test', validate(testValidation.getTests), testController.getTests)
router.get('/test/:id', validate(testValidation.getTest), testController.getTest)
router.put('/image/upload', upload.single('image'), imageController.uploadImage);
router.get('/image', imageController.getImage);


module.exports = router;