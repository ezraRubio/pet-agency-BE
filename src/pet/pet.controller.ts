import { NextFunction, Request, Response, Router } from "express";
import { Pet } from "./pet.model";
import { addPetValidator, editPetValidator } from "./pet.request.validator";
import { PetService } from "./pet.service";

const pet = "/pet";
const petById = "/pet/:id";

export class PetController {
  router = Router();

  constructor(private petService: PetService) {
    this.router.get(
      petById,
      (req: Request, res: Response, next: NextFunction) =>
        this.getPetById(req.params.id)
          .then((pet) => pet)
          .catch((err) => next(err))
    );
    this.router.post(
      pet,
      addPetValidator,
      (req: Request, res: Response, next: NextFunction) =>
        this.addNewPet(req.body)
          .then((pet) => pet)
          .catch((err) => next(err))
    );
    this.router.put(
      petById,
      editPetValidator,
      (req: Request, res: Response, next: NextFunction) =>
        this.editExistingPet(req.params.id, req.body)
          .then((pet) => pet)
          .catch((err) => next(err))
    );
    this.router.delete(
      petById,
      (req: Request, res: Response, next: NextFunction) =>
        this.deleteExistingPet(req.params.id)
          .then((succeed) => succeed)
          .catch((err) => next(err))
    );
  }

  getPetById(petId: string) {
    return this.petService.getSinglePet(petId);
  }

  addNewPet(newPetDto: Pet) {
    return this.petService.addPet(newPetDto);
  }

  editExistingPet(petId: string, editData: Partial<Pet>) {
    return this.petService.editPet(petId, editData);
  }

  deleteExistingPet(petId: string) {
    return this.petService.deletePet(petId);
  }
}
