import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export type Payload = {
  id: string;
};

export function generateToken(payload: Payload) {
  const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '7d' });
  return token;
}
