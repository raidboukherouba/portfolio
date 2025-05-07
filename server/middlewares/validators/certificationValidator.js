const { body } = require('express-validator');

exports.validateCertification = [
  body('title').notEmpty().withMessage('Title is required'),
  body('issuer').optional().isString(),
  body('date').notEmpty().withMessage('Date is required').isISO8601().toDate(),
  body('description').optional().isString(),
  body('credentialUrl').optional().isURL().withMessage('Must be a valid URL')
];
