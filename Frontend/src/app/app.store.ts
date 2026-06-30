import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/state/auth.slice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
