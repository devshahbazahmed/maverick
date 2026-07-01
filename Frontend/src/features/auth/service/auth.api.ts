import axios from 'axios';
import type { ILoginUser, IRegisterUser } from '../types';

const authApiInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1/auth',
  withCredentials: true,
});

export async function register({
  email,
  password,
  fullName,
  contact,
  isSeller,
}: IRegisterUser) {
  const response = await authApiInstance.post('/register', {
    email,
    password,
    fullName,
    contact,
    isSeller,
  });
  return response.data;
}

export async function login({ email, password }: ILoginUser) {
  const response = await authApiInstance.post('/login', {
    email,
    password,
  });
  return response.data;
}
