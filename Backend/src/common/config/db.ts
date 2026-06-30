import mongoose from 'mongoose';
import { config } from './config.js';

async function connectDB() {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI);
    console.log(`MongoDB Database Connected`);
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
    throw error;
  }
}

export default connectDB;
