const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

const resumeUploadValidation = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
];

const interviewValidation = [
  body('domain').notEmpty().withMessage('Domain is required'),
  body('difficulty').isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty level'),
];

module.exports = { validate, registerValidation, loginValidation, resumeUploadValidation, interviewValidation };
