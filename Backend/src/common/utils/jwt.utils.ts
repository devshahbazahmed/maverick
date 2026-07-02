import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import type { Payload } from '../types/index.js';

export function generateToken(payload: Payload) {
  const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '7d' });
  return token;
}

export function verifyToken(token: string) {
  const payload = jwt.verify(token, config.JWT_SECRET) as Payload;
  return payload;
}
