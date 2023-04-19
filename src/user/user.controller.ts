import { Router } from "express";
import { UserService } from "./user.service";

const userById = "/user/:id";

export class UserController {
  router = Router();

  constructor(private userService: UserService) {
    this.router.get(userById);
    this.router.put(userById);
    this.router.delete(userById);
  }

  getUserById() {

  }

  updateUser() {

  }

  deleteUser() {
    
  }
}
