import type React from 'react';
import { useAppSelector } from '../../../app/app.hooks';
import { Navigate } from 'react-router';

export default function ProtectedPage({
  children,
  role = 'buyer',
}: {
  children: React.ReactNode;
  role: string;
}) {
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
