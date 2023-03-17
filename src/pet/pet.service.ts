import { Pet } from "./pet.model";
import { PetRepository } from "./pet.repository";
import { SearchDTO } from "./pet.types";

export class PetService {
    constructor(private petRepository: PetRepository){}

    getAllPets = async (searchQuery: SearchDTO): Promise<Pet[]> => {
        console.log("service", searchQuery)
        const pets = await this.petRepository.findAll(searchQuery)

        if (!pets.length) console.log("no pets")
console.log("res srv", pets)
        return pets
    }
}