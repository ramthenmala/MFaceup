import express from 'express';
import { API_END_POINTS } from '../utils/apipath';
import validateResource from '../middleware/validateResource';
import { createSessionSchema } from '../schema/auth.schema';
import { createSessionHandler, refreshAccessTokenHandler } from '../controllers/auth/auth.controller';

const authRouter = express.Router();

authRouter.post(API_END_POINTS.SESSION, validateResource(createSessionSchema), createSessionHandler)
authRouter.post(API_END_POINTS.REFRESH, refreshAccessTokenHandler)
export default authRouter