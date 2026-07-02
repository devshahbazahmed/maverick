import { createBrowserRouter } from 'react-router';
import RegisterPage from '../features/auth/pages/Register';
import LoginPage from '../features/auth/pages/Login';
import CreateProduct from '../features/products/pages/CreateProduct';
import Dashboard from '../features/products/pages/Dashboard';
import ProtectedPage from '../features/products/components/ProtectedPage';
import Home from '../features/products/pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
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
    path: '/seller',
    children: [
      {
        path: 'create-product',
        element: (
          <ProtectedPage role="seller">
            <CreateProduct />
          </ProtectedPage>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedPage role="seller">
            <Dashboard />
          </ProtectedPage>
        ),
      },
    ],
  },
]);
