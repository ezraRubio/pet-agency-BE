import { Document, Filter, WithId } from "mongodb";
import { Mongo } from "../db/mongo";
import { User } from "../user/user.model";
import { ModifyResult } from "mongodb";
import { ObjectId } from "mongodb";

export class UserPetRepository {
  setSavePetToUser = (
    filter: Filter<User>,
    petId: ObjectId
  ): Promise<WithId<User>> =>
    Mongo.user().findOneAndUpdate(
      filter,
      {$push: { savedPets: petId }},
      { returnDocument: "after", projection: { savedPets: 1, _id: 0 } }
    ).then(res => res.value);

  setAdoptPetToUser = (
    filter: Filter<User>,
    petId: ObjectId
  ): Promise<WithId<User>> =>
    Mongo.user().findOneAndUpdate(
      filter,
      {$push: { adoptedPets: petId }},
      { returnDocument: "after", projection: { adoptedPets: 1 } }
    ).then(res => res.value);

  removeSavePetToUser = (
    filter: Filter<User>,
    petId: ObjectId
  ): Promise<WithId<User>> =>
    Mongo.user().findOneAndUpdate(
      filter,
      { $pull: { savedPets: petId } },
      { returnDocument: "after", projection: { savedPets: 1 } }
    ).then(res => res.value);

  removeAdoptPetToUser = (
    filter: Filter<User>,
    petId: ObjectId
  ): Promise<WithId<User>> =>
    Mongo.user().findOneAndUpdate(
      filter,
      { $pull: { adoptedPets: petId } },
      { returnDocument: "after", projection: { adoptedPets: 1 } }
    ).then(res => res.value);

  retrieveUserPets = (filter: Filter<User>): PromiseLike<Document> =>
    Mongo.user().aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "pets",
          localField: "savedPets",
          foreignField: "_id",
          as: "savedPets",
        },
      },
      {
        $lookup: {
          from: "pets",
          localField: "adoptedPets",
          foreignField: "_id",
          as: "adoptedPets",
        },
      },
      {
        $project: {
          adoptedPets: 1,
          savedPets: 1,
          _id: 0
        },
      },
    ]).tryNext().then(res=>res);
}
