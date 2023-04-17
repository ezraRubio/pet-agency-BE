import { Router } from "express";
import { UserService } from "./user.service";

const signUp = "/sign_up";

export class SignUpController {
  router = Router();

  constructor(private userService: UserService) {
    this.router.post(signUp);
  }

  userSignUp() {
    
  }
}
