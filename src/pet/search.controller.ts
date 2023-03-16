import {Request, Response, Router} from "express";
import { PetService } from "./pet.service";

const search = "/search"

export class SearchController {
    router = Router()

    constructor(private petService: PetService) {
        this.router.get(search, (req: Request, res: Response) => {
            this.search(req.query.type as string).then(r=>res.json(r))
        })
    }

    search(petType: string){
        console.log("controller", petType)
        return this.petService.getAllPets(petType);
    }
}