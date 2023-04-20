import { NextFunction, Response, Router } from "express";
import { UserService } from "./user.service";
import { updatePasswordValidation } from "./user.request.validator";
import { AuthReq } from "../auth/permission.middleware";
import { User } from "./user.model";

const userById = "/user/:id";
const updatePassword = "/password";

export class UserController {
  router = Router();

  constructor(private userService: UserService) {
    this.router.get(userById);
    this.router.put(userById);
    this.router.put(
      updatePassword,
      updatePasswordValidation,
      (req: AuthReq, res: Response, next: NextFunction) =>
        this.updateUserPassword(req.user.uid, req.body)
          .then((token) => res.json(token))
          .catch((e) => next(e))
    );
    this.router.delete(userById);
  }

  getUserById() {}

  updateUser() {}

  updateUserPassword(uid: string, newPassword: Partial<User>) {
    return this.userService.updatePassword(uid, newPassword.password);
  }

  deleteUser() {}
}
