import express from 'express';
import { createUserHandler, forgotPasswordHandler, getCurrentUserHandler, loginUserHandler, resetPasswordHandler, verifyUserHandler } from '../controllers/auth/user.controller';
import requireUser from '../middleware/requireuser';
import validateResource from '../middleware/validateResource';
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from '../schema/user.schema';
import { API_END_POINTS } from '../utils/apipath';

const userRoutes = express.Router();

userRoutes.post(API_END_POINTS.REGISTER, validateResource(createUserSchema), createUserHandler)
userRoutes.post(API_END_POINTS.FORGOT_PASSWORD, validateResource(forgotPasswordSchema), forgotPasswordHandler)
userRoutes.post(API_END_POINTS.VERIFY_USER, validateResource(verifyUserSchema), verifyUserHandler)
userRoutes.post(API_END_POINTS.RESET_PASSWORD, validateResource(resetPasswordSchema), resetPasswordHandler)
userRoutes.get(API_END_POINTS.LOGIN, requireUser, getCurrentUserHandler)

export default userRoutes