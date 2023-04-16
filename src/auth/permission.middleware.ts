import { NextFunction, Request, Response } from "express";
import { mapRolesToPermissions } from "./permission.mapper";
import { Permission, Role } from "./roles";
import { PermissionsError } from "../error/error.module";

export type AuthReq = Request & {
  user?: { roles?: Role[]; uid?: string };
  tokenExp?: number;
};

export const has =
  (permissions: Permission[]) =>
  (req: AuthReq, _res: Response, next: NextFunction) =>
    isAllowed(permissions, req.user?.roles)
      ? next()
      : next(new PermissionsError());

const isAllowed = (permissions: Permission[], r?: Role[]) =>
  permissions.every((p) => r && mapRolesToPermissions(r)?.includes(p));
