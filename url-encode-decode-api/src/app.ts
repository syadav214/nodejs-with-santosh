import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { json } from 'body-parser';
import routesV1 from './routes/v1';

const app = express();

app.use(json());
app.use("/api/v1", routesV1);

export default app;