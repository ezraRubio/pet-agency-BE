import { DuplicateEntryError } from "../error/error.module";
import { Mongo } from "../db/mongo";
import { User } from "./user.model";
import { Filter, ObjectId, OptionalId } from "mongodb";

export class UserRepository {
  addNewUser = (data: OptionalId<User>): Promise<ObjectId> =>
    Mongo.user()
      .insertOne(data)
      .then((res) => res.insertedId)
      .catch((e) => {
        throw new DuplicateEntryError();
      });

  findOneUser = (filter: Filter<User>): Promise<User> =>
    Mongo.user().findOne(filter, {projection: {password: 0}});

  updateOneUser = (filter: Filter<User>, data: Partial<User>): Promise<User> =>
    Mongo.user()
      .findOneAndUpdate(filter, { $set: data }, { returnDocument: "after" })
      .then((res) => res.value);

  removeOneUser = (filter: Filter<User>): Promise<number> => 
    Mongo.user().deleteOne(filter).then(result=>result.deletedCount)
}
