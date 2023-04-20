import { NextFunction, Request, Response, Router } from "express";
import { UserService } from "./user.service";
import { userCredentialValidation } from "./user.request.validator";
import { User } from "./user.model";

const logIn = "/log_in";

export class LogInController {
  router = Router();

  constructor(private userService: UserService) {
    this.router.post(
      logIn,
      userCredentialValidation,
      (req: Request, res: Response, next: NextFunction) =>
        this.userLogIn(req.body).then(user => res.json(user)).catch((e) => next(e))
    );
  }

  userLogIn(user: User) {
    return this.userService.logIn(user);
  }
}
