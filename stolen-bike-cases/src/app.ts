import * as bodyParser from 'body-parser';
import * as express from 'express';
import routes from './routes';

const app = express();
app.use(bodyParser.json());
// Routes of the app
routes(app);

export default app;
