import express, { Request, Response, Router } from 'express';
import { IUser } from '../../models/user';
import { registerUser, IRegisterUserResponse, loginUser, ILoginUserResponse } from '../../services/userServices';

const router: Router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    const { email, password, name }: IUser = req.body;
    const registerUserResponse: IRegisterUserResponse = await registerUser({ email, password, name });
    return res.status(registerUserResponse.status).send(registerUserResponse);
});

router.post('/login', async (req: Request, res: Response) => {
    const { email, password }: IUser = req.body;
    const loginUserResponse: ILoginUserResponse = await loginUser({ email, password });
    return res.status(loginUserResponse.status).send(loginUserResponse);
});



export { router as userRouter }