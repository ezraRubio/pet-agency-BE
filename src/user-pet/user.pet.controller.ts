import { NextFunction, Response, Router } from "express";
import { Controller } from "../controller";
import { UserPetService } from "./user.pet.service";
import { AuthReq } from "../auth/permission.middleware";
import { ObjectId } from "mongodb";

const savePet = "/pet/:id/save";
const adoptPet = "/pet/:id/adopt";
const userPet = "/user/:id/pets";

export class UserPetController implements Controller {
  router = Router();

  constructor(private userPetService: UserPetService) {
    this.router.post(
      savePet,
      (req: AuthReq, res: Response, next: NextFunction) =>
        this.savePet(req.params.id, req.user.uid)
          .then((pet) => res.json(pet))
          .catch((e) => next(e))
    );
    this.router.delete(
      savePet,
      (req: AuthReq, res: Response, next: NextFunction) =>
        this.unSavePet(req.params.id, req.user.uid)
          .then((pet) => res.json(pet))
          .catch((e) => next(e))
    );
    this.router.post(
      adoptPet,
      (req: AuthReq, res: Response, next: NextFunction) =>
        this.adoptPet(req.params.id, req.user.uid)
          .then((pet) => res.json(pet))
          .catch((e) => next(e))
    );
    this.router.delete(
      adoptPet,
      (req: AuthReq, res: Response, next: NextFunction) =>
        this.unAdoptPet(req.params.id, req.user.uid)
          .then((pet) => res.json(pet))
          .catch((e) => next(e))
    );
    this.router.get(
      userPet,
      (req: AuthReq, res: Response, next: NextFunction) =>
      this.getUserPets(req.user.uid)
        .then((pets) => res.json(pets))
        .catch((e) => next(e))
    )
  }

  savePet(petId: string, userId: string) {
    return this.userPetService.savePetToUser(new ObjectId(petId), userId);
  }

  unSavePet(petId: string, userId: string) {
    return this.userPetService.unSavedPetToUser(new ObjectId(petId), userId);
  }

  adoptPet(petId: string, userId: string) {
    return this.userPetService.adoptPet(new ObjectId(petId), userId);
  }

  unAdoptPet(petId: string, userId: string) {
    return this.userPetService.returnPet(new ObjectId(petId), userId);
  }

  getUserPets(userId: string) {
    return this.userPetService.getUserPets(userId)
  }
}
