import { Router, type IRouter } from 'express';
import {
  validateLoginUser,
  validateRegisterUser,
} from './validators/auth.validator.js';
import * as authController from './auth.controllers.js';
import passport from 'passport';

const authRouter: IRouter = Router();

authRouter.post('/register', validateRegisterUser, authController.register);

authRouter.post('/login', validateLoginUser, authController.login);

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  authController.googleCallback
);

export default authRouter;
