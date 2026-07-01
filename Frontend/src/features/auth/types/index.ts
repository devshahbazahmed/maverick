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
