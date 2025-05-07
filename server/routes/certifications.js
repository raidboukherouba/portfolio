const express = require('express');
const router = express.Router();
const certificationController = require('../controllers/certificationController');
const { validateCertification } = require('../middlewares/validators/certificationValidator');
const handleValidationErrors = require('../middlewares/handleValidationErrors');

router.get('/', certificationController.getAllCertifications);
router.get('/:id', certificationController.getCertificationById);
router.post('/', validateCertification, handleValidationErrors, certificationController.createCertification);
router.put('/:id', validateCertification, handleValidationErrors, certificationController.updateCertification);
router.delete('/:id', certificationController.deleteCertification);

module.exports = router;
