//TODO:
//! Get user GET
//! Update user PUT
//! Sign up user POST should be public endpoint
//! Delete user DELETE
//! login user POST should be public endpoint

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
