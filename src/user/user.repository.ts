import { DuplicateEntryError } from "../error/error.module";
import { Mongo } from "../db/mongo";
import { User } from "./user.model";
import { Filter, ObjectId, OptionalId } from "mongodb";

export class UserRepository {
  addNewUser = (user: OptionalId<User>): Promise<ObjectId> =>
    Mongo.user()
      .insertOne(user)
      .then((res) => res.insertedId)
      .catch((e) => {
        throw new DuplicateEntryError();
      });

  findOneUser = (filter: Filter<User>): Promise<User> =>
    Mongo.user().findOne(filter);
}
