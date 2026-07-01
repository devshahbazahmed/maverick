import { Router, type IRouter } from 'express';
import {
  validateLoginUser,
  validateRegisterUser,
} from './validators/auth.validator.js';
import * as authController from './auth.controllers.js';

const authRouter: IRouter = Router();

authRouter.post('/register', validateRegisterUser, authController.register);

authRouter.post('/login', validateLoginUser, authController.login);

export default authRouter;
