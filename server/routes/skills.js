const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const handleValidationErrors = require('../middlewares/handleValidationErrors');
const { validateSkill } = require('../middlewares/validators/skillValidator');

router.get('/', skillController.getAllSkills);
router.get('/:id', skillController.getSkillById);
router.post('/', validateSkill, handleValidationErrors, skillController.createSkill);
router.put('/:id', validateSkill, handleValidationErrors, skillController.updateSkill);
router.delete('/:id', skillController.deleteSkill);

module.exports = router;
