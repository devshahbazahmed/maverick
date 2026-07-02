import './App.css';
import { RouterProvider } from 'react-router';
import { router } from './app.routes.tsx';
import { useAppSelector } from './app.hooks.ts';
import { useAuth } from '../features/auth/hook/useAuth.ts';
import { useEffect } from 'react';

const App = () => {
  const { handleGetUser } = useAuth();
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);
  useEffect(() => {
    handleGetUser();
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
