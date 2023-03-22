import { Request, Response, NextFunction } from "express";
import {expressjwt} from "express-jwt";
import jwks from "jwks-rsa";
import { AuthReq } from "./permission.middleware";
import { UnauthorizedError } from "../error/error.module";

export interface AppMiddleware {
    (request: Request, response: Response, next: NextFunction): void;
}

export const createAuthMiddleware = (auth0IssuerBaseUrl: string, auth0JwtUserInfoNamespace: string): AppMiddleware => {
    const expressJwtMiddleware = expressjwt({
        secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 15,
          jwksUri: `${ auth0IssuerBaseUrl }.well-known/jwks.json`,
        }) as jwks.GetVerificationKey,
        algorithms: [ "RS256" ],
    });

    return async (req: AuthReq, res: Response, next: NextFunction) => {
        await expressJwtMiddleware(req, res, (err: string | Error) => {
          if (err) {
            return next(new UnauthorizedError());
          }
      
          req.user = {
            ...((req as any).auth || {}),
            ...((req as any).auth?.[auth0JwtUserInfoNamespace] || {})
          };
      
          if (req.user?.roles && typeof req.user.roles === "string") req.user.roles = JSON.parse(req.user.roles);
          
          next();
        })
    }
};