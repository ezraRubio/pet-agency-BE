import { NextFunction, Request, Response, Router } from "express";
import { UserService } from "./user.service";
import { userCredentialValidation } from "./user.request.validator";
import { User } from "./user.model";

const signUp = "/sign_up";

export class SignUpController {
  router = Router();

  constructor(private userService: UserService) {
    this.router.post(
      signUp,
      userCredentialValidation,
      (req: Request, res: Response, next: NextFunction) =>
        this.userSignUp(req.body).then(token => res.json(token)).catch((e) => next(e))
      );
  }

  userSignUp(credentials: User) {
    return this.userService.signUp(credentials)
  }
}
