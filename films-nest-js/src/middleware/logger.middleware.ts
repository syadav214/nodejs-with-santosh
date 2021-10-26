import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import * as jwt from "jsonwebtoken";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        let isAuthenticated: boolean = false;
        let authorization: string = req.headers["authorization"];

        if (authorization) {
            try {
                authorization = authorization.replace("Bearer ", "");
                await jwt.verify(authorization, process.env.TOKEN_SECRET);
                isAuthenticated = true;
            } catch {
                console.log("invalid token");
            }
        }

        if (isAuthenticated) {
            next();
        } else {
            throw new HttpException({ errors: "UNAUTHORIZED" }, 401);
        }
    }
}
