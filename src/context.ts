import { Controller } from "./controller";
import { PetController } from "./pet/pet.controller";
import { PetRepository } from "./pet/pet.repository";
import { PetService } from "./pet/pet.service";
import { SearchController } from "./pet/search.controller";
import { HealthController } from "./health/health.controller";

//Repositories: 
const petRepository = new PetRepository();

//Services:
const petService = new PetService(petRepository);

//Controllers:
const petController = new PetController(petService);
const searchController = new SearchController(petService);
const healthController = new HealthController();

export const UnprotectedControllers = [
    searchController,
    healthController,
    petController
].map((c: Controller) => c.router);

// export const ProtectedControllers = [
//     petController
// ].map((c: Controller) => c.router);