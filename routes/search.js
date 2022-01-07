import express from "express";
import { getPets } from "../controllers/pets.js";

export const search = express.Router();

search.get("/", getPets);