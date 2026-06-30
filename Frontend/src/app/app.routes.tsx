import { createBrowserRouter } from 'react-router';
import RegisterPage from '../features/auth/pages/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Hello</h1>,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);
