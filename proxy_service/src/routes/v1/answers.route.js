const express = require("express");
const validate = require('../../middlewares/validate');
const { answersValidation } = require("../../validations");
const { answersController } = require("../../controllers");

const router = express.Router()

router.post('/analyze', validate(answersValidation.analyze), answersController.analyze);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Answers
 *   description: Hanldes request needed to proccess a canidates answers
 */

/**
 * @swagger
 * /answers/analyze:
 *   post:
 *     summary: Analyze a user's answers
 *     tags: [Answers]
 *     parameters: 
 *       - in: header
 *         name: authorization
 *         type: string
 *         required: true
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