import { Filter } from "mongodb";
import { Mongo } from "../db/mongo";
import { Pet } from "./pet.model";

export class PetRepository {
  findAll = (filter: Filter<Pet>): Promise<Pet[]> =>
    Mongo.pet().find(filter).toArray();
}
