import { Filter, InsertOneResult, ObjectId, OptionalId } from "mongodb";
import { DuplicateEntryError } from "../error/error.module";
import { Mongo } from "../db/mongo";
import { Pet } from "./pet.model";

export class PetRepository {
  findAll = (filter: Filter<Pet>): Promise<Pet[]> =>
    Mongo.pet().find(filter).toArray();

  findSinglePet = (filter: Filter<Pet>): Promise<Pet> =>
    Mongo.pet().findOne(filter);

  editSinglePet = (filter: Filter<Pet>, data: Partial<Pet>) =>
    Mongo.pet().findOneAndUpdate(filter, data);

  removePet = (filter: Filter<Pet>): Promise<number> =>
    Mongo.pet()
      .deleteOne(filter)
      .then((res) => res.deletedCount);

  addNewPet = (data: OptionalId<Pet>): Promise<ObjectId> =>
    Mongo.pet()
      .insertOne(data)
      .then((res) => res.insertedId)
      .catch((e) => {
        throw new DuplicateEntryError();
      });
}
