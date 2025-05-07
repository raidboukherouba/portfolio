const { body } = require('express-validator');

exports.validateDiploma = [
  body('title').notEmpty().withMessage('Title is required'),
  body('institution').optional().isString(),
  body('field').optional().isString(),
  body('date').notEmpty().withMessage('Date is required').isISO8601().toDate(),
  body('description').optional().isString()
];
