import express, { Router } from 'express';
import { healthRouter } from './health';
import { shortnerRouter } from './url-shortner';

const rootRouter: Router = express.Router();
rootRouter.use('/health', healthRouter);
rootRouter.use('/url-shortner', shortnerRouter);

export default rootRouter;