export type IRegisterUser = {
  email: string;
  password: string;
  fullName: string;
  contact: string;
  isSeller: boolean;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type UserRole = 'buyer' | 'seller';

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  contact: string;
  role: UserRole;
};

export type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  error: unknown | null;
};
