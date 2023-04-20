import { NextFunction, Request, Response, Router } from "express";
import { UserService } from "./user.service";
import {
  updatePasswordValidation,
  userModelValidation,
} from "./user.request.validator";
import { AuthReq } from "../auth/permission.middleware";
import { User } from "./user.model";

const userById = "/user/:id";
const updatePassword = "/password";

export class UserController {
  router = Router();

  constructor(private userService: UserService) {
    this.router.get(
      userById,
      (req: Request, res: Response, next: NextFunction) =>
        this.getUserById(req.params.id)
          .then((user) => res.json(user))
          .catch((e) => next(e))
    );
    this.router.put(
      userById,
      userModelValidation,
      (req: Request, res: Response, next: NextFunction) =>
        this.updateUser(req.params.id, req.body)
          .then((user) => res.json(user))
          .catch((e) => next(e))
    );
    this.router.put(
      updatePassword,
      updatePasswordValidation,
      (req: AuthReq, res: Response, next: NextFunction) =>
        this.updateUserPassword(req.user.uid, req.body)
          .then((token) => res.json(token))
          .catch((e) => next(e))
    );
    this.router.delete(
      userById,
      (req: Request, res: Response, next: NextFunction) =>
        this.deleteUser(req.params.id)
          .then((succeed) => res.json(succeed))
          .catch((e) => next(e))
    );
  }

  getUserById(id: string) {
    return this.userService.getSingleUser(id);
  }

  updateUser(uid: string, data: Partial<User>) {
    return this.userService.updateUser(uid, data);
  }

  updateUserPassword(uid: string, newPassword: Partial<User>) {
    return this.userService.updatePassword(uid, newPassword.password);
  }

  deleteUser(id: string) {
    return this.userService.deleteUser(id);
  }
}
