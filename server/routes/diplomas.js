const express = require('express');
const router = express.Router();
const diplomaController = require('../controllers/diplomaController');
const { validateDiploma } = require('../middlewares/validators/diplomaValidator');
const handleValidationErrors = require('../middlewares/handleValidationErrors');

router.get('/', diplomaController.getAllDiplomas);
router.get('/:id', diplomaController.getDiplomaById);
router.post('/', validateDiploma, handleValidationErrors, diplomaController.createDiploma);
router.put('/:id', validateDiploma, handleValidationErrors, diplomaController.updateDiploma);
router.delete('/:id', diplomaController.deleteDiploma);

module.exports = router;
