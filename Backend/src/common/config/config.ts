import dotenv from 'dotenv';

dotenv.config();

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

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error('GOOGLE_CLIENT_ID is not defined in environment variables');
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    'GOOGLE_CLIENT_SECRET is not defined in environment variables'
  );
}

if (!process.env.GOOGLE_CALLBACK_URL) {
  throw new Error(
    'GOOGLE_CALLBACK_URL is not defined in environment variables'
  );
}

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV is not defined in environment variables');
}

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  throw new Error(
    'IMAGEKIT_PRIVATE_KEY is not defined in environment variables'
  );
}

if (!process.env.IMAGEKIT_PUBLIC_KEY) {
  throw new Error(
    'IMAGEKIT_PUBLIC_KEY is not defined in environment variables'
  );
}

export const config: CONFIG = {
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  NODE_ENV: process.env.NODE_ENV,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
};
