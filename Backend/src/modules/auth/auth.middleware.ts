import { type Request, type Response, type NextFunction } from 'express';
import ApiError from '../../common/utils/api-error.js';
import { verifyToken } from '../../common/utils/jwt.utils.js';
import UserModel from './auth.model.js';

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    throw ApiError.unauthorized('Unauthorized');
  }

  try {
    const decoded = verifyToken(token);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      throw ApiError.unauthorized('Unauthorized');
    }

    req.user = user;
    next();
  } catch (error) {
    throw ApiError.unauthorized('Unauthorized');
  }
};

export const authenticateSeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    throw ApiError.unauthorized('Unauthorized');
  }

  try {
    const decoded = verifyToken(token);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      throw ApiError.unauthorized('Unauthorized');
    }

    if (user.role !== 'seller') {
      throw ApiError.forbidden('Forbidden');
    }

    req.user = user;
    next();
  } catch (error) {
    throw ApiError.unauthorized('Unauthorized');
  }
};
