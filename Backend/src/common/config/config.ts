import dotenv from 'dotenv';

dotenv.config();

export type CONFIG = {
  readonly MONGODB_URI: string;
  readonly JWT_SECRET: string;
};

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export const config: CONFIG = {
  MONGODB_URI: process.env.MONGODB_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
};
