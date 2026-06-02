import express from 'express';
import { body } from 'express-validator';
import {
  createOrder,
  getMyOrders,
  getOrderById,
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.use(protect);

router.post(
  '/',
  [
    body('orderItems').isArray({ min: 1 }).withMessage('Order items required'),
    body('orderItems.*.product').notEmpty().withMessage('Product ID required'),
    body('orderItems.*.quantity')
      .isInt({ min: 1 })
      .withMessage('Quantity must be at least 1'),
    body('shippingAddress.fullName').notEmpty().withMessage('Full name required'),
    body('shippingAddress.phone').notEmpty().withMessage('Phone required'),
    body('shippingAddress.street').notEmpty().withMessage('Street required'),
    body('shippingAddress.city').notEmpty().withMessage('City required'),
    body('shippingAddress.province').notEmpty().withMessage('Province required'),
  ],
  validate,
  createOrder
);

router.get('/my', getMyOrders);
router.get('/:id', getOrderById);

export default router;
