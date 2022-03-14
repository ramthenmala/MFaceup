import express from 'express';

import { createUserHandler } from '../controllers/auth/controller.auth'
import { loginUserHandler } from '../controllers/auth/controller.auth'
import { verifyUserHandler } from '../controllers/auth/post.register';
import validateResource from '../middleware/validateResource';
import { createUserSchema, verifyUserSchema } from '../schema/user.schema';
import { API_END_POINTS } from '../utils/apipath';


const authRouter = express.Router();

authRouter.post(API_END_POINTS.REGISTER, validateResource(createUserSchema), createUserHandler)
authRouter.post(API_END_POINTS.LOGIN, loginUserHandler)

authRouter.post(API_END_POINTS.VERIFY_USER, validateResource(verifyUserSchema), verifyUserHandler)

export default authRouter