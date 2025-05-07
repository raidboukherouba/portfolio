const { body } = require('express-validator');

exports.validateRegister = [
  body('email')
    .isEmail().withMessage('A valid email is required')
    .normalizeEmail(),
    
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .trim(),
    
  body('rememberMe')
    .optional()
    .isBoolean().withMessage('Remember me must be a boolean value')
];

exports.validateLogin = [
  body('email')
    .isEmail().withMessage('A valid email is required')
    .normalizeEmail(),
    
  body('password')
    .notEmpty().withMessage('Password is required')
    .trim(),
    
  body('rememberMe')
    .optional()
    .isBoolean().withMessage('Remember me must be a boolean value')
];

exports.validateForgotPassword = [
  body('email')
    .isEmail().withMessage('A valid email is required')
    .normalizeEmail()
];

exports.validateResetPassword = [
  body('token')
    .notEmpty().withMessage('Reset token is required'),

  body('newPassword')
    .isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
    .trim()
];