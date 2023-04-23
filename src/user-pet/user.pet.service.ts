import { PetRepository } from "../pet/pet.repository";
import { Pet } from "../pet/pet.model";
import { UserPetRepository } from "./user.pet.repository";
import { AppError, NotFoundError } from "../error/error.module";
import { ErrorCodes } from "../error/error.codes";
import { ObjectId } from "mongodb";

export class UserPetService {
    constructor(private userPetRepository: UserPetRepository, private petRepository: PetRepository){}

    savePetToUser = async (petId:ObjectId, userId:string): Promise<Pet[]> => {
        const updatedUser = await this.userPetRepository.setSavePetToUser({id: userId}, petId)
        if (!updatedUser) throw new NotFoundError(ErrorCodes.USER_NOT_FOUND)

        const userPets = await this.userPetRepository.retrieveUserPets({id: userId})       
        if (!userPets) throw new NotFoundError(ErrorCodes.USER_NOT_FOUND)

        return userPets.savedPets
    }

    unSavedPetToUser = async (petId: ObjectId, userId: string) => {
        const updatedUser = await this.userPetRepository.removeSavePetToUser({id: userId}, petId)
        if (!updatedUser) throw new NotFoundError(ErrorCodes.USER_NOT_FOUND)

        const userPets = await this.userPetRepository.retrieveUserPets({id: userId})       
        if (!userPets) throw new NotFoundError(ErrorCodes.USER_NOT_FOUND)

        return userPets.savedPets
    }
}