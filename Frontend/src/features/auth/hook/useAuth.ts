import { setError, setLoading, setUser } from '../state/auth.slice.ts';
import { register } from '../service/auth.api.ts';
import type { IRegisterUser } from '../types/index.ts';
import { useDispatch } from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch();
  async function handleRegister({
    email,
    password,
    fullName,
    contact,
    isSeller = false,
  }: IRegisterUser) {
    dispatch(setLoading(true));
    const data = await register({
      email,
      password,
      fullName,
      contact,
      isSeller,
    });
    dispatch(setUser(data.user));
  }
  return {
    handleRegister,
  };
};
