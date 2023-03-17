import { Request, Response, Router } from "express";
import { Status, Type } from "./pet.model";
import { searchQueryValidator } from "./pet.request.validator";
import { PetService } from "./pet.service";
import { SearchDTO } from "./pet.types";

const search = "/search";

export class SearchController {
  router = Router();

  constructor(private petService: PetService) {
    this.router.get(
      search,
      searchQueryValidator,
      (req: Request, res: Response) => {
        this.search(req.query as SearchDTO).then((r) => res.json(r));
      }
    );
  }

  search(searchQuery?: SearchDTO) {
    return this.petService.getAllPets(searchQuery);
  }
}
