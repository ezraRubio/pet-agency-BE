import { SearchDTO } from "../../src/pet/pet.types";
import { PetService } from "../../src/pet/pet.service";
import { NotFoundError } from "../../src/error/error.module";
import { ErrorType } from "../../src/error/error.types";
import { ErrorCodes } from "../../src/error/error.codes";
import { expectedPets } from "./utils";
import { PetRepository } from "../../src/pet/pet.repository";
import { Mongo } from "../../src/db/mongo";
import config from "../../src/config";

describe("getAllPets", () => {
  const petRepository = new PetRepository();
  const petService = new PetService(petRepository);

  beforeAll(() => Mongo.connect(config.URI));
  afterAll(() => Mongo.close());

  it("should return an array of pets when they exist", async () => {
    const searchQuery: SearchDTO = { name: "Fluffs" };

    const result = await petService.getAllPets(searchQuery);

    expect(petRepository.findAll).toHaveBeenCalledWith(searchQuery);
    expect(result[0].name).toEqual(expectedPets[1].name);
  });

  it("should throw a NotFoundError when no pets are found", async () => {
    const searchQuery: SearchDTO = { name: "Nonexistent" };

    await expect(petService.getAllPets(searchQuery)).rejects.toThrowError(
      new NotFoundError(ErrorCodes.PET_NOT_FOUND, ErrorType.NOT_FOUND)
    );
    expect(petRepository.findAll).toHaveBeenCalledWith(searchQuery);
  });

  it("should return all pets from an empty search query", async () => {
    const searchQuery = {};
    const results = await petService.getAllPets(searchQuery);

    expect(petRepository.findAll).toHaveBeenCalledWith(searchQuery);
    expect(results.length).toBeGreaterThan(1);
  });
});

describe("getSinglePet", () => {
  const petRepository = new PetRepository();
  const petService = new PetService(petRepository);

  it("should return a single pet when it exists", async () => {
    const id = "1";
    const result = await petService.getSinglePet(id);

    expect(result).toEqual(expectedPets[0]);
    expect(petRepository.findSinglePet).toHaveBeenCalledWith({ id });
  });

  it("should throw a NotFoundError when the pet does not exist", async () => {
    const id = "nonexistent";

    await expect(petService.getSinglePet(id)).rejects.toThrowError(
      new NotFoundError(ErrorCodes.PET_NOT_FOUND, ErrorType.NOT_FOUND)
    );
    expect(petRepository.findSinglePet).toHaveBeenCalledWith({ id });
  });
});
