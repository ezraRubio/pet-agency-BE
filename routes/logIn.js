import express from "express";
import { userLogIn } from "../controllers/logIn.js";

export const logIn = express.Router();

logIn.post("/", userLogIn);
