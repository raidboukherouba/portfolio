const { body } = require('express-validator');

exports.validateMessage = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('message').notEmpty().withMessage('Message content is required')
];
