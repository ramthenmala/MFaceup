import express from 'express';

import { createUserHandler } from '../controllers/auth/controller.auth'
import { loginUserHandler } from '../controllers/auth/controller.auth'
import { forgotPasswordHandler, verifyUserHandler } from '../controllers/auth/post.register';
import validateResource from '../middleware/validateResource';
import { createUserSchema, forgotPasswordSchema, verifyUserSchema } from '../schema/user.schema';
import { API_END_POINTS } from '../utils/apipath';


const authRouter = express.Router();

authRouter.post(API_END_POINTS.REGISTER, validateResource(createUserSchema), createUserHandler)
authRouter.post(API_END_POINTS.LOGIN, loginUserHandler)

authRouter.post(API_END_POINTS.VERIFY_USER, validateResource(verifyUserSchema), verifyUserHandler)
authRouter.post(API_END_POINTS.FORGOT_PASSWORD, validateResource(forgotPasswordSchema), forgotPasswordHandler)
export default authRouter