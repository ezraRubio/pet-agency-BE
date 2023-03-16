import { Filter } from "mongodb";
import { Mongo } from "../db/mongo";
import { Pet } from "./pet.model";

export class PetRepository {
  findAll = (filter: Filter<Pet>) =>
    Mongo.pet()
      .find(filter)
      .toArray()
      .then((pets) => {
        console.log("result from db", pets)
        return pets
      });
}
