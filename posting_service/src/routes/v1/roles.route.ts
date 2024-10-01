import express from "express";
import { rolesValidation } from "../../validations"
import { rolesController } from "../../controllers";
import { validate } from "../../middleware/validate";

const router = express.Router();

router.get('/',  validate(rolesValidation.getRoles), rolesController.getRoles)
router.get('/id', validate(rolesValidation.getRole), rolesController.getRole)
router.put('/id', validate(rolesValidation.putRole), rolesController.putRole)
router.put('/id/canidates', validate(rolesValidation.addCanidates), rolesController.addCanidates)
router.post('/id/canidates', validate(rolesValidation.getCanidates), rolesController.getCanidatesForRecruiter)
router.get('/id/canidates/id', validate(rolesValidation.getCanidateEvaluation), rolesController.getCanidateEvaluation)
    
export default router