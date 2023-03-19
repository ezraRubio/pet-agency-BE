import express from "express";
import {
  addPet,
  getPetById,
  editPet,
  adoptPet,
  returnPet,
  savePet,
  deleteSavedPet,
  getPetsByUser
} from "../controllers/pets.js";
import { upload } from "../src/utils/multer.js";
import admin from '../middleware/admin.js'

export const petRouter = express.Router();


petRouter.post("/", admin, upload.single('image'), addPet);
petRouter.get("/:id", getPetById);
//EDIT
petRouter.put("/:id", admin, upload.single('image'), editPet);
petRouter.post("/:id/adopt", adoptPet);
petRouter.post("/:id/return", returnPet);
petRouter.post("/:id/save", savePet);
//delete
petRouter.delete("/:id/save", deleteSavedPet);

//move to user path
petRouter.get("/user/:id", getPetsByUser);
