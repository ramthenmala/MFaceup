import express from 'express';
import authRouter from './auth.routes';
import { API_END_POINTS } from '../utils/apipath';

const coreRouter = express.Router();

coreRouter.use(authRouter)

export default coreRouter;