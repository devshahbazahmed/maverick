import { body, validationResult } from 'express-validator';
import { type NextFunction, type Request, type Response } from 'express';

function validateRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

export const validateRegisterUser = [
  body('email')
    .isEmail()
    .withMessage('Invalid email format')
    .notEmpty()
    .withMessage('Email is required'),
  body('contact')
    .notEmpty()
    .withMessage('Contact is required')
    .matches(/^|d{10}$/)
    .withMessage('Contact number must be of 10 characters'),
  body('fullName')
    .notEmpty()
    .withMessage('Full Name is required')
    .isLength({ min: 3 })
    .withMessage('Full name must be atleast 3 characters long'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be of minimum 6 characters'),
  body('isSeller').isBoolean().withMessage('isSeller must be a boolean value'),
  validateRequest,
];

export const validateLoginUser = [
  body('email')
    .isEmail()
    .withMessage('Invalid email format')
    .notEmpty()
    .withMessage('Email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be of minimum 6 characters'),
  validateRequest,
];
