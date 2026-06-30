import ApiError from '../../common/utils/api-error.js';
import ApiResponse from '../../common/utils/api-response.js';
import { generateToken } from '../../common/utils/jwt.utils.js';
import UserModel from './auth.model.js';
import { type Request, type Response } from 'express';

export const register = async (req: Request, res: Response) => {
  const { email, password, fullName, contact, isSeller } = req.body;

  const existingUser = await UserModel.findOne({
    $or: [{ email }, { contact }],
  });

  if (existingUser)
    throw ApiError.conflict('User with this email or contact already exists');

  const user = await UserModel.create({
    email,
    password,
    fullName,
    contact,
    role: isSeller ? 'seller' : 'buyer',
  });

  const token = generateToken({ id: user._id.toString() });

  const safeUser = {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
    contact: user.contact,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return ApiResponse.created(res, 'Registeration success', safeUser);
};
