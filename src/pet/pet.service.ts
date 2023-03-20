import { ErrorCodes } from "../error/error.codes";
import {
  AppError,
  DuplicateEntryError,
  NotFoundError,
} from "../error/error.module";
import { ErrorType } from "../error/error.types";
import { Pet } from "./pet.model";
import { PetRepository } from "./pet.repository";
import { SearchDTO } from "./pet.types";

export class PetService {
  constructor(private petRepository: PetRepository) {}

  getAllPets = async (searchQuery: SearchDTO): Promise<Pet[]> => {
    const pets = await this.petRepository.findAll(searchQuery);

    if (!pets.length)
      throw new NotFoundError(ErrorCodes.PET_NOT_FOUND, ErrorType.NOT_FOUND);

    return pets;
  };

  getSinglePet = async (id: string): Promise<Pet> => {
    const singlePet = await this.petRepository.findSinglePet({ id });

    if (!singlePet)
      throw new NotFoundError(ErrorCodes.PET_NOT_FOUND, ErrorType.NOT_FOUND);

    return singlePet;
  };

  addPet = async (data: Pet): Promise<Boolean> => {
    const isAdded = await this.petRepository.addNewPet(data);

    if (!isAdded) throw new DuplicateEntryError();

    return !!isAdded;
  };

  editPet = async (id: string, data: Partial<Pet>): Promise<Pet> => {
    const editedPet = await this.petRepository.editSinglePet({ id }, data);

    if (!editedPet) console.log("something went wrong"); //TODO: make better error handling

    return;
  };

  deletePet = async (id: string): Promise<boolean> => {
    const isDeleted = await this.petRepository.removePet({ id });

    if (!isDeleted)
      throw new NotFoundError(ErrorCodes.PET_NOT_FOUND, ErrorType.NOT_FOUND);

    return !!isDeleted;
  };
}
