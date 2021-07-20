import * as dotenv from 'dotenv';
dotenv.config();
import * as express from 'express';

const app = express();

app.get('/', (req, res) => res.send({ Hello: 'World' }));
app.get('/test', (req, res) => res.send({ Hello: 'test' }));

export default app;
