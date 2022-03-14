require('dotenv').config()
import express from 'express';
import http from 'http';
import cors from 'cors';
import config from 'config';
import mongoose from 'mongoose';

import connectDb from './utils/connectDB';
import log from './utils/logger';
import coreRouter from './routes';

const PORT = config.get<number>('port') || 5002

const app = express()

app.use(express.json())
app.use(cors())

// Register Router
app.use(coreRouter)



app.listen(PORT, () => {
    connectDb();
    log.info(`http://localhost:${PORT}`)
})
