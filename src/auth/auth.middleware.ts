import config from "../config";
import { Response, NextFunction } from "express";
import { AuthReq } from "./permission.middleware";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../error/error.module";

export const auth = (req: AuthReq, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) throw new UnauthorizedError();

  jwt.verify(token, config.SECRET, (err, token: jwt.JwtPayload) => {
    if (err) {
      return next(new UnauthorizedError());
    }

    req.tokenExp = token.exp;
    req.user = {
      roles: [token.role],
      uid: token.uid,
    }

    if (req.user?.roles && typeof req.user.roles === "string") req.user.roles = JSON.parse(req.user.roles);

    next();
  });
};
