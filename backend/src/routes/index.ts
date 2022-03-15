import express from 'express';
import userRoutes from './user.routes';

const coreRouter = express.Router();

coreRouter.use(userRoutes)

export default coreRouter;