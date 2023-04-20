import { Controller } from "./controller";
import { PetController } from "./pet/pet.controller";
import { PetRepository } from "./pet/pet.repository";
import { PetService } from "./pet/pet.service";
import { SearchController } from "./pet/search.controller";
import { HealthController } from "./health/health.controller";
import { UserRepository } from "./user/user.repository";
import { UserService } from "./user/user.service";
import { UserController } from "./user/user.controller";
import { LogInController } from "./user/user.login.controller";
import { SignUpController } from "./user/user.signup.controller";

//Repositories: 
const petRepository = new PetRepository();
const userRepository = new UserRepository();

//Services:
const petService = new PetService(petRepository);
const userService = new UserService(userRepository);

//Controllers:
const petController = new PetController(petService);
const searchController = new SearchController(petService);
const userController = new UserController(userService);
const logInController = new LogInController(userService);
const signUpController = new SignUpController(userService);
const healthController = new HealthController();

export const UnprotectedControllers = [
    logInController,
    signUpController,
    searchController,
    healthController,
].map((c: Controller) => c.router);

export const ProtectedControllers = [
    userController,
    petController,
].map((c: Controller) => c.router);
