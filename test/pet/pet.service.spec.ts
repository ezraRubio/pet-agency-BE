import { SearchDTO } from "../../src/pet/pet.types";
import { PetService } from "../../src/pet/pet.service";
import {
  DuplicateEntryError,
  NotFoundError,
} from "../../src/error/error.module";
import { ErrorType } from "../../src/error/error.types";
import { ErrorCodes } from "../../src/error/error.codes";
import { expectedPets, aPet } from "./utils";
import { PetRepository } from "../../src/pet/pet.repository";
import { Mongo } from "../../src/db/mongo";
import config from "../../src/config";

describe("Pet Service", () => {
  const petRepository = new PetRepository();
  const petService = new PetService(petRepository);

  beforeAll(async () => {
    await Mongo.connect(config.TEST_DB);
    await Mongo.pet().insertMany(expectedPets);
  });
  afterAll(async () => {
    await Mongo.pet().deleteMany({});
    await Mongo.close();
  });

  describe("getAllPets", () => {
    it("should return an array of pets when they exist", async () => {
      const searchQuery: SearchDTO = { name: "Fluffs" };

      const result = await petService.getAllPets(searchQuery);

      expect(result[0].name).toEqual(expectedPets[1].name);
    });

    it("should throw a NotFoundError when no pets are found", async () => {
      const searchQuery: SearchDTO = { name: "Nonexistent" };

      await expect(petService.getAllPets(searchQuery)).rejects.toThrowError(
        new NotFoundError(ErrorCodes.PET_NOT_FOUND, ErrorType.NOT_FOUND)
      );
    });

    it("should return all pets from an empty search query", async () => {
      const searchQuery = {};
      const results = await petService.getAllPets(searchQuery);

      expect(results.length).toBeGreaterThan(1);
    });
  });

  describe("getSinglePet", () => {
    it("should return a single pet when it exists", async () => {
      const id = "1";
      const result = await petService.getSinglePet(id);

      expect(result).toEqual(expectedPets[0]);
    });

    it("should throw a NotFoundError when the pet does not exist", async () => {
      const id = "nonexistent";

      await expect(petService.getSinglePet(id)).rejects.toThrowError(
        new NotFoundError(ErrorCodes.PET_NOT_FOUND, ErrorType.NOT_FOUND)
      );
    });
  });

  describe("deletePet", () => {
    it("should delete a pet from db", async () => {
      const id = "1";

      const isDeleted = await petService.deletePet(id);

      expect(isDeleted).toBe(true);
    });

    it("should throw error when deleting non existing pet", async () => {
      const id = "nonexistent";

      await expect(petService.deletePet(id)).rejects.toThrowError(
        new NotFoundError(ErrorCodes.PET_NOT_FOUND, ErrorType.NOT_FOUND)
      );
    });
  });

  describe("addPet", () => {
    it("should throw error if adding already existent pet", async () => {
      await expect(petService.addPet(expectedPets[1])).rejects.toThrowError(
        new DuplicateEntryError()
      );
    });

    it("should successfully add new pet", async () => {
      const isAdded = await petService.addPet(aPet);

      expect(isAdded).toBe(true);
    });
  });
});
