import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.js';

dotenv.config();

const app = express();
app.use(express.json());

// Authentication
app.use('/api', userRouter);

mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.once('connected', () => {
    console.log('Database Connected');
});
mongoose.connection.on('error', (error) => {
    console.log(error);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});
