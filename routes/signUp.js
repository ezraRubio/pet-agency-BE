import express from "express";
import { userSignUp } from "../controllers/signUp.js";

export const signUp = express.Router();

signUp.post("/", userSignUp);
