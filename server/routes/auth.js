const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister, validateLogin, validateForgotPassword, validateResetPassword } = require('../middlewares/validators/authValidator');
const handleValidationErrors = require('../middlewares/handleValidationErrors');

router.post('/register', validateRegister, handleValidationErrors, authController.register);
router.post('/login', validateLogin, handleValidationErrors, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);


// Forgot/reset password routes
router.post('/forgot-password', validateForgotPassword, handleValidationErrors, authController.forgotPassword);
router.post('/reset-password', validateResetPassword, handleValidationErrors, authController.resetPassword);

module.exports = router;
