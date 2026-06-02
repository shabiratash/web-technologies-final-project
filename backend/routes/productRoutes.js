import express from 'express';
import { body } from 'express-validator';
import {
  getProducts,
  getProductById,
  getCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

const productValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category')
    .isIn(['boots', 'sandals', 'traditional', 'leather-goods', 'accessories'])
    .withMessage('Invalid category'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('stock').isInt({ min: 0 }).withMessage('Valid stock is required'),
];

router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);

router.post('/', protect, authorize('admin'), productValidation, validate, createProduct);
router.put('/:id', protect, authorize('admin'), validate, updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

export default router;
