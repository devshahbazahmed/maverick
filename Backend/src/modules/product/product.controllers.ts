import { type Request, type Response } from 'express';
import ProductModel from './product.model.js';
import { uploadFile } from '../../common/services/storage.service.js';
import { Types } from 'mongoose';
import ApiResponse from '../../common/utils/api-response.js';

type AuthUser = {
  id: string;
  _id?: Types.ObjectId;
  email: string;
  role: 'buyer' | 'seller';
};

export async function createProduct(req: Request, res: Response) {
  const { title, description, priceAmount, priceCurrency } = req.body;
  const seller = req.user as AuthUser;
  const files = req.files as Express.Multer.File[];

  const images = await Promise.all(
    files.map(async (file) => {
      return await uploadFile({
        buffer: file.buffer,
        fileName: file?.originalname,
      });
    })
  );

  const product = await ProductModel.create({
    title,
    description,
    price: {
      amount: priceAmount,
      currency: priceCurrency || 'INR',
    },
    images,
    seller: seller.id,
  });

  return ApiResponse.created(res, 'Product created successfully', product);
}
