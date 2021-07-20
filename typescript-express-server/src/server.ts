import * as dotenv from 'dotenv';
dotenv.config();

import app from './app';

app.listen({ port: process.env.PORT }, () => {
  console.log(`Go to http://localhost:${process.env.PORT}`);
});
