import {Request, Response, Router} from "express";
import { PetService } from "./pet.service";

const pet = "/pet/:id"
const adoptPet = "/pet/:id/adopt"
const returnPet = "/pet/:id/return"
const savePet = "/pet/:id/save"

export class PetController {
    router = Router()

    constructor(private petService: PetService) {
        this.router.get(pet, (req: Request, res: Response)=>{
            console.log("req", req)
            res.send("pet controller")
        })
    }
}