import { createBrowserRouter } from 'react-router';
import RegisterPage from '../features/auth/pages/Register';
import LoginPage from '../features/auth/pages/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Hello</h1>,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);
