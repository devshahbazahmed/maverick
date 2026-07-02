import { Router, type IRouter } from 'express';
import { authenticateSeller } from '../auth/auth.middleware.js';
import * as productController from './product.controllers.js';
import multer from 'multer';
import { createProductValidator } from './validators/product.validator.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

const productRouter: IRouter = Router();

productRouter.post(
  '/',
  authenticateSeller,
  upload.array('images', 7),
  createProductValidator,
  productController.createProduct
);

productRouter.get(
  '/seller',
  authenticateSeller,
  productController.getSellerProducts
);

productRouter.get('/', productController.getAllProducts);

export default productRouter;
