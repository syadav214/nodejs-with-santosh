import { Request, Response } from 'express';
import { verifyToken } from "../../services/userServices";
import { HttpStatusCode } from '../../utils/http-response';

export interface IAuthenticateTokenResponse {
    message: string;
    status: HttpStatusCode;
}

const authenticateToken = async (req: Request, res: Response, next: any) => {
    let token: string = req.headers.authorization || "";
    
    if (token !== "") {
        token = token.split(" ")[1];
    }
    
    if (token !== "" && await verifyToken(token)) {
        next();
    } else {
        const response: IAuthenticateTokenResponse = {
            message: "Unauthorized",
            status: HttpStatusCode.UNAUTHORIZED
        }
        return res.status(response.status).send(response);
    }
};

export default authenticateToken;