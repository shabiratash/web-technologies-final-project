import express from 'express';
import { body } from 'express-validator';
import { updateProfile, updatePassword } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.use(protect);

router.put('/profile', updateProfile);

router.put(
  '/password',
  [
    body('currentPassword').notEmpty().withMessage('Current password required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters'),
  ],
  validate,
  updatePassword
);

export default router;
