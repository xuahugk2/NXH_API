import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { logger, logEvents } from './logger/logger.js';
import errorHandler from './logger/errorHandler.js';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
import codeRouter from './routes/codeRouter.js';

dotenv.config();

const app = express();
app.use(logger);
app.use(cors());
app.use(express.json());

// Authentication router
app.use('/api/auth', authRouter);
// User router
app.use('/api/users', userRouter);
// Code router
app.use('/api/code', codeRouter);

// Handle error
app.use(errorHandler);

mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.once('connected', () => {
    console.log('Database Connected');
});
mongoose.connection.on('error', (error) => {
    console.log(error);
    logEvents(
        `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
        'mongoErrLog.log',
    );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});
