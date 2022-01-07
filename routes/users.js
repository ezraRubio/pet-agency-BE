import express from "express";
import {
  getAllUsers,
  getUser,
  editUser,
  checkToken,
} from "../controllers/users.js";

export const userRouter = express.Router();

userRouter.get("/token", checkToken);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.put("/:id", editUser);
