import express from 'express';
import { validate } from '../../middleware/validate';
import analyzeValidation from '../../validations/assessment.validation';
import { assessmentController } from '../../controllers';

const router = express.Router();

router
    .route('/design')
    .post(validate(analyzeValidation.saveAssessment), assessmentController.saveAssessment);

export {
    router
}

/**
 * @swagger
 * tags:
 *   name: Test
 *   description: Analyze results from assessment
 */

/**
 * @swagger
 * /test/design:
 *   post:
 *     summary: Analyze a UX design assessment
 *     description: Leverages LLM to analyze the results of a UX design assessment from DesignScout
 *     tags: [Test]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: email of the tester
 *               testId:
 *                 type: string
 *                 description: id of the test being taken
 *               comments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     imageS3Uri:
 *                       type: string
 *                     questionId:
 *                       type: string
 *                     displayOrder:
 *                       type: number
 *                     comment:
 *                       type: string
 *                    
 *     responses:
 *       "200":
 *         description: OK
 */