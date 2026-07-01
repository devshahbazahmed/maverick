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
  };

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return ApiResponse.created(res, 'Registeration success', safeUser);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select('+password');

  if (!user) {
    throw ApiError.badRequest('User with this email does not exists');
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw ApiError.badRequest('Invalid email or password');
  }

  const token = await generateToken({ id: user._id.toString() });

  const safeUser = {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
    contact: user.contact,
    role: user.role,
  };

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return ApiResponse.ok(res, 'Login success', safeUser);
};

type GoogleUser = {
  id: string;
  displayName: string;
  emails: {
    value: string;
    verified: boolean;
  }[];
  photos: {
    value: string;
  }[];
};

export const googleCallback = async (req: Request, res: Response) => {
  const { id, displayName, emails, photos } = req.user as GoogleUser;
  const email = emails?.[0]?.value;
  const profilePic = photos?.[0]?.value;

  if (!email) {
    throw ApiError.badRequest('Email not provided by Google');
  }

  let user = await UserModel.findOne({ email });

  if (!user) {
    user = await UserModel.create({
      email,
      googleId: id,
      fullName: displayName,
    });
  }

  const token = generateToken({ id: user._id.toString() });

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.redirect('http://localhost:5173/');
};
