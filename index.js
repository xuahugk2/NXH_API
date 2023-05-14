import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/', (req, res) => {
    res.send('Hello.');
});

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
