import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose'
import { json } from 'body-parser';
import routes from './routes';
import authenticateToken from "./middleware/authenticateToken";

const app = express();

app.use(json());
app.use('/api/health', routes.healthRouter);
app.use('/api/user', routes.userRouter);
app.use('/api/task', authenticateToken, routes.taskRouter);

mongoose.connect(process.env.MONGO_CONN_STRING || "", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}, () => {
    console.log('connected to database');
});

app.listen({ port: process.env.PORT }, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('disconnected database through app termination');
        process.exit(0);
    });
});