const { body } = require('express-validator');

exports.validateProject = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('technologies').optional().isArray().withMessage('Technologies must be an array'),
  body('githubUrl').optional().isURL().withMessage('Invalid GitHub URL'),
  body('liveUrl').optional().isURL().withMessage('Invalid Live URL')
];
