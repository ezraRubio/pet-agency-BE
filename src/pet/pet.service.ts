import { Pet } from "./pet.model";
import { PetRepository } from "./pet.repository";

export class PetService {
    constructor(private petRepository: PetRepository){}

    getAllPets = async (petType: string): Promise<Pet[]> => {
        console.log("service", petType)
        const pets = await this.petRepository.findAll({petType})

        if (!pets.length) console.log("no pets")
console.log("res srv", pets)
        return pets
    }
}