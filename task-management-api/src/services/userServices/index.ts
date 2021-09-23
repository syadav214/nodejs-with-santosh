import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from "../../utils/http-response";
import { saltRounds } from "../../utils/constants";
import { User, IUser } from '../../models/user';

const tokenKey: string = process.env.TOKEN_KEY || '';
const tokenExpiry: string = process.env.TOKEN_EXPIRY || '2h';

export interface IRegisterUserResponse {
    message: string;
    status: HttpStatusCode;
}

const registerUser = async ({ email, password, name }: IUser): Promise<IRegisterUserResponse> => {
    const registerUserResponse: IRegisterUserResponse = {
        message: "user created",
        status: HttpStatusCode.RESOURCE_CREATED
    };

    if (!email || !password || !name) {
        registerUserResponse.message = "Please provide the details";
        registerUserResponse.status = HttpStatusCode.BAD_REQUEST;
        return registerUserResponse;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
        email,
        password: hashedPassword,
        name
    });

    try {
        await user.save();
    } catch (err) {
        registerUserResponse.message = "user already exists or invalid email";
        registerUserResponse.status = HttpStatusCode.INTERNAL_SERVER;
        console.log('create user error: ' + err.message);
    }
    return registerUserResponse;
};


export interface ILoginUserResponse {
    message: string;
    status: HttpStatusCode;
    token: string;
}

const loginUser = async ({ email, password }: { email: string, password: string }): Promise<ILoginUserResponse> => {
    const loginUserResponse: ILoginUserResponse = {
        message: "",
        status: HttpStatusCode.OK,
        token: ""
    };

    try {
        const user = await User.findOne({ email: email });

        if (user && user.email) {
            const isPasswordMatched: boolean = await bcrypt.compare(password, user.password);

            if (isPasswordMatched) {               
                if (tokenKey !== '') {
                    const token: string = jwt.sign(
                        { email, name: user.name },
                        tokenKey,
                        {
                            expiresIn: tokenExpiry,
                        });

                    const refreshToken: string = jwt.sign(
                        { email, name: user.name },
                        tokenKey,
                        {
                            expiresIn: "60 days",
                        });

                    await User.findOneAndUpdate({ email: email }, { token, refreshToken });

                    loginUserResponse.message = "user logged in";
                    loginUserResponse.token = token;
                } else {
                    loginUserResponse.message = "Internal Error";
                    loginUserResponse.status = HttpStatusCode.INTERNAL_SERVER;
                }

            } else {
                loginUserResponse.message = "Invalid user";
                loginUserResponse.status = HttpStatusCode.UNAUTHORIZED;
            }
        } else {
            loginUserResponse.message = "Invalid user";
            loginUserResponse.status = HttpStatusCode.UNAUTHORIZED;
        }

    } catch (err) {
        loginUserResponse.message = "Internal Error";
        loginUserResponse.status = HttpStatusCode.INTERNAL_SERVER;
        console.log('user login error: ' + err.message);
    }

    return loginUserResponse;
}

const verifyToken = async (token: string): Promise<boolean> => {
    let valid: boolean = false;

    try {
        const decoded: any = await jwt.verify(token, tokenKey);
        if (decoded.email) {
            valid = true;
        }
    } catch (err) {
        console.log('verifyToken error: ' + err.message);
    }
    return valid;
};


const refreshToken = async (token: string): Promise<ILoginUserResponse> => {
    const loginUserResponse: ILoginUserResponse = {
        message: "",
        status: HttpStatusCode.OK,
        token: ""
    };

    try {
        const decoded: any = await jwt.verify(token, tokenKey);

        if (decoded && decoded.email) {
            const user: any = await User.findOne({ email: decoded.email });

            if (user && user.email) {
                const decodedRefreshToken: any = await jwt.verify(user.refreshToken, tokenKey);

                if(decodedRefreshToken) {
                    loginUserResponse.token = jwt.sign(
                        { user.email, name: user.name },
                        tokenKey,
                        {
                            expiresIn: tokenExpiry,
                        });;
                    loginUserResponse.message = "token refreshed";
                }                
            }
        }
    } catch (err) {
        console.log('refreshToken error: ' + err.message);
        loginUserResponse.message = "Internal Error";
        loginUserResponse.status = HttpStatusCode.INTERNAL_SERVER;
    }
    return loginUserResponse;
};

export { registerUser, loginUser, verifyToken, refreshToken };