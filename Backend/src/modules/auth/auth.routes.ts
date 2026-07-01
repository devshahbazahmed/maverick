import { Router, type IRouter } from 'express';
import {
  validateLoginUser,
  validateRegisterUser,
} from './validators/auth.validator.js';
import * as authController from './auth.controllers.js';
import passport from 'passport';
import { config } from '../../common/config/config.js';

const authRouter: IRouter = Router();

authRouter.post('/register', validateRegisterUser, authController.register);

authRouter.post('/login', validateLoginUser, authController.login);

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect:
      config.NODE_ENV === 'development'
        ? 'http://localhost:5173/login'
        : '/login',
  }),
  authController.googleCallback
);

export default authRouter;
