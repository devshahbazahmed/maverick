import { Types } from 'mongoose';

export type CONFIG = {
  readonly MONGODB_URI: string;
  readonly JWT_SECRET: string;
  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_CLIENT_SECRET: string;
  readonly GOOGLE_CALLBACK_URL: string;
  readonly NODE_ENV: string;
  readonly IMAGEKIT_PRIVATE_KEY: string;
  readonly IMAGEKIT_PUBLIC_KEY: string;
};

export type UploadFileParams = {
  buffer: Buffer;
  fileName: string;
  folder?: string;
};

export type Payload = {
  id: string;
  role: 'seller' | 'buyer';
};

export type GoogleUser = {
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

export type SafeUser = {
  id: string;
  email: string;
  contact: string;
  fullName: string;
  role: 'buyer' | 'seller';
};

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  contact: string;
  role: 'buyer' | 'seller';
  googleId?: string;
}

export type AuthUser = {
  id: string;
  _id?: Types.ObjectId;
  email: string;
  fullName: string;
  contact: string;
  role: 'buyer' | 'seller';
};
