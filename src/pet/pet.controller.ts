import { Request, Response, Router } from "express";
import { Pet } from "./pet.model";
import { PetService } from "./pet.service";

const pet = "/pet";
const petById = "/pet/:id";

export class PetController {
  router = Router();

  constructor(private petService: PetService) {
    this.router.get(petById, (req: Request, res: Response) =>
      this.getPetById(req.params.id).then((pet) => pet)
    );
    this.router.post(pet, (req: Request, res: Response) =>
      this.addNewPet(req.body).then((pet) => pet)
    );
    this.router.put(petById, (req: Request, res: Response) =>
      this.editExistingPet(req.params.id, req.body).then((pet) => pet)
    );
    this.router.delete(petById, (req: Request, res: Response) =>
      this.deleteExistingPet(req.params.id).then((succeed) => succeed)
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
