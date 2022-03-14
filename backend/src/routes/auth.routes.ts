import express from 'express';

import { createUserHandler } from '../controllers/auth/controller.auth'
import { loginUserHandler } from '../controllers/auth/controller.auth'
import validateResource from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';
import { API_END_POINTS } from '../utils/apipath';


const authRouter = express.Router();

authRouter.post(API_END_POINTS.REGISTER, validateResource(createUserSchema), createUserHandler)
authRouter.post(API_END_POINTS.LOGIN, loginUserHandler)

export default authRouter