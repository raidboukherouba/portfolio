const { body } = require('express-validator');

exports.validateProfile = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('profession').notEmpty().withMessage('Profession is required'),
  body('avatar')
    .optional({ checkFalsy: true }) // This will treat empty strings as undefined
    .isURL()
    .withMessage('Avatar must be a valid URL'),
  body('bio')
    .optional({ checkFalsy: true })
    .isLength({ max: 1000 })
    .withMessage('Bio must be under 1000 characters'),
  body('age')
    .optional({ checkFalsy: true })
    .isInt({ min: 0, max: 120 })
    .withMessage('Age must be a valid number between 0 and 120'),
  body('location.city')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('City must be a string'),
  body('location.country')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Country must be a string'),
  body('socialLinks.github')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('GitHub must be a valid URL'),
  body('socialLinks.linkedin')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('LinkedIn must be a valid URL'),
  body('socialLinks.twitter')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Twitter must be a valid URL'),
  body('socialLinks.facebook')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Facebook must be a valid URL'),
  body('socialLinks.website')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Website must be a valid URL'),
  body('cv')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('CV must be a valid URL')
];