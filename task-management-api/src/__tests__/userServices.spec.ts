import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { User, IUser } from '../models/user';
import { registerUser, IRegisterUserResponse, loginUser, ILoginUserResponse, verifyToken } from '../services/userServices';
import { HttpStatusCode } from "../utils/http-response";

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGO_CONN_STRING || '', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }, () => {
    console.log('connected to database');
  });
});

describe('userServices', () => {
  it('registerUser without details', async () => {
    const user: IUser = {
      email: '',
      password: '',
      name: ''
    };
    const registerUserResponse: IRegisterUserResponse = await registerUser(user);
    expect(registerUserResponse.status).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it('registerUser', async () => {
    const user: IUser = {
      email: 'etst@gmail.com',
      password: '25555',
      name: 'loefe'
    };
    const registerUserResponse: IRegisterUserResponse = await registerUser(user);
    expect(registerUserResponse.status).toBe(HttpStatusCode.RESOURCE_CREATED);
  });

  it('loginUser without password', async () => {
    const loginUserResponse: ILoginUserResponse = await loginUser({
      email: 'etst@gmail.com',
      password: ''
    });
    expect(loginUserResponse.status).toBe(HttpStatusCode.UNAUTHORIZED);
  });

  let token: string = "";
  it('loginUser', async () => {
    const loginUserResponse: ILoginUserResponse = await loginUser({
      email: 'etst@gmail.com',
      password: '25555'
    });
    expect(loginUserResponse.status).toBe(HttpStatusCode.OK);
    token = loginUserResponse.token;
  });

  it('verifyToken', async () => {
    const valid: boolean = await verifyToken(token);
    expect(valid).toBe(true);
  });

  it('verifyToken with wrong token', async () => {
    const valid: boolean = await verifyToken("llgkfglkfgkfgkfglfgkfg");
    expect(valid).toBe(false);
  });
});

afterAll(async () => {
  await User.remove({});
  await mongoose.connection.close()
});