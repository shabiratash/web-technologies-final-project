import express from 'express';
import { body } from 'express-validator';
import {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/stats', getDashboardStats);
router.get('/orders', getAllOrders);
router.put(
  '/orders/:id',
  [
    body('status')
      .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
      .withMessage('Invalid status'),
  ],
  validate,
  updateOrderStatus
);
router.get('/users', getAllUsers);
router.put(
  '/users/:id',
  body('role').isIn(['user', 'admin']).withMessage('Invalid role'),
  validate,
  updateUserRole
);
router.delete('/users/:id', deleteUser);

export default router;
