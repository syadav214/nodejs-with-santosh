import express from 'express';
import cors from 'cors';
import { generateOTP, validatedOTP } from './otp-manager';

const app = express();
const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: "*",
    preflightContinue: false,
  };
app.use(cors(options));
const port = 5000;

app.get('/health', (req, res) => res.send("Healthy!"));

app.get('/generate-otp/:phoneNumber', (req, res) => {
    res.json(generateOTP(req.params.phoneNumber));
});

app.get('/validate-otp/:phoneNumber/:otp', (req, res) => {
    res.json(validatedOTP(req.params.phoneNumber, parseInt(req.params.otp)));
});


app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});