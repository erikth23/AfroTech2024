import express from 'express';
import { testsValidation } from '../../validations';
import { validate } from "../../middleware/validate";
import { testsController } from '../../controllers';

const router = express.Router();

router.get('/', validate(testsValidation.getTests), testsController.getTests)
router.post('/id', validate(testsValidation.getTest), testsController.getTest)

export default router