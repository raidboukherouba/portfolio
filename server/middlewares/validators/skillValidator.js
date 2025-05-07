const { body } = require('express-validator');

exports.validateSkill = [
  body('name')
    .notEmpty()
    .withMessage('Skill name is required'),

  body('level')
    .optional({ checkFalsy: true }) // Accepts "", null, undefined as valid skips
    .isIn(['Beginner', 'Intermediate', 'Advanced'])
    .withMessage('Level must be Beginner, Intermediate, or Advanced'),

  body('category')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Category must be a string'),

  body('logo')
    .optional({ checkFalsy: true }) // 💡 This is key
    .isString()
    .withMessage('Logo must be a string')
    .isURL()
    .withMessage('Logo must be a valid URL'),
];
