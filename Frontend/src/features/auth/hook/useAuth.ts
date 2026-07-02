import { setError, setLoading, setUser } from '../state/auth.slice.ts';
import { login, register } from '../service/auth.api.ts';
import type { ILoginUser, IRegisterUser } from '../types/index.ts';
import { useAppDispatch } from '../../../app/app.hooks.ts';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  async function handleRegister({
    email,
    password,
    fullName,
    contact,
    isSeller = false,
  }: IRegisterUser) {
    try {
      dispatch(setLoading(true));
      const data = await register({
        email,
        password,
        fullName,
        contact,
        isSeller,
      });
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }: ILoginUser) {
    try {
      dispatch(setLoading(true));
      const data = await login({ email, password });
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    handleRegister,
    handleLogin,
  };
};
