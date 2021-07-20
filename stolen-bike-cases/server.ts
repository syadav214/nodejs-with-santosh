import * as dotenv from 'dotenv';
dotenv.config();

import app from './src/app';
import { auto_assignment } from './src/cases/auto_assignment';

app.listen({ port: process.env.PORT }, () => {
  console.log(`Go to http://localhost:${process.env.PORT}`);
});

// A continuous running task for assigning a case to an officer
auto_assignment();
