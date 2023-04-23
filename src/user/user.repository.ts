import { DuplicateEntryError, NotFoundError } from "../error/error.module";
import { Mongo } from "../db/mongo";
import { User } from "./user.model";
import { Filter, ObjectId, OptionalId } from "mongodb";
import { ErrorCodes } from "../error/error.codes";

export class UserRepository {
  addNewUser = (data: OptionalId<User>): Promise<ObjectId> =>
    Mongo.user()
      .insertOne(data)
      .then((res) => res.insertedId)
      .catch((e) => {
        throw new DuplicateEntryError();
      });

  findOneUser = (
    filter: Filter<User>,
    withoutPassword?: boolean
  ): Promise<User> =>
    Mongo.user().findOne(filter, {
      projection: { password: withoutPassword && 0, _id: 0 },
    });

  updateOneUser = (filter: Filter<User>, data: Partial<User>): Promise<User> =>
    Mongo.user()
      .findOneAndUpdate(
        filter,
        { $set: data },
        { returnDocument: "after", projection: { password: 0, _id: 0 } }
      )
      .then((res) => res.value);

  removeOneUser = (filter: Filter<User>): Promise<number> =>
    Mongo.user()
      .deleteOne(filter)
      .then((result) => result.deletedCount);

  findAllOrFail = (): Promise<User[]> =>
    Mongo.user()
      .find()
      .toArray()
      .then((res) => res)
      .catch((e) => {
        throw new NotFoundError(ErrorCodes.USER_NOT_FOUND);
      });
}
