import express from 'express';
import multer from 'multer';
import { imageController } from '../controllers';

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(), // Store file in memory before uploading
  });

router.put("/upload", upload.single('image'), imageController.uploadImage);
router.get("/", imageController.getImage)


export {
  router
}
