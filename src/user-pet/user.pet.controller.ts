import { Router } from "express";
import { Controller } from "../controller";
import { UserPetService } from "./user.pet.service";

export class UserPetController implements Controller {
    router = Router()

    constructor(userPetService: UserPetService){
        
    }
}