const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { validateProfile } = require('../middlewares/validators/profileValidator');
const handleValidationErrors = require('../middlewares/handleValidationErrors');

router.get('/', profileController.getProfile);
router.post('/', validateProfile, handleValidationErrors, profileController.createOrUpdateProfile);

module.exports = router;






