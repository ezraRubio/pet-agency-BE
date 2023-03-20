import { Filter, InsertOneResult, OptionalId } from "mongodb";
import { Mongo } from "../db/mongo";
import { Pet } from "./pet.model";

export class PetRepository {
  findAll = (filter: Filter<Pet>): Promise<Pet[]> =>
    Mongo.pet().find(filter).toArray();

  findSinglePet = (filter: Filter<Pet>): Promise<Pet> =>
    Mongo.pet().findOne(filter);

  editSinglePet = (filter: Filter<Pet>, data: Partial<Pet>) => 
    Mongo.pet().findOneAndUpdate(filter, data);

  removePet = (filter: Filter<Pet>) => 
    Mongo.pet().deleteOne(filter).then(res => res.deletedCount);

  addNewPet = (data: OptionalId<Pet>): Promise<InsertOneResult<Pet>> =>
    Mongo.pet().insertOne(data); 
}
