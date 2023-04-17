import { Router } from "express";
import { UserService } from "./user.service";

const logIn = "/log_in";

export class LogInController {
  router = Router();

  constructor(private userService: UserService) {
    this.router.post(logIn);
  }

  userLogIn() {
    
  }
}
