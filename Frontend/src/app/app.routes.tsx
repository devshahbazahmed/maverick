import { createBrowserRouter } from 'react-router';
import RegisterPage from '../features/auth/pages/Register';
import LoginPage from '../features/auth/pages/Login';
import CreateProduct from '../features/products/pages/CreateProduct';

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
  {
    path: '/products/create',
    element: <CreateProduct />,
  },
]);
