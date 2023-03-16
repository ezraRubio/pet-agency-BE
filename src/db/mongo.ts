import { MongoClient, Db } from "mongodb";
import { User } from "src/user/user.model";
import { Pet } from "../pet/pet.model";

const user = "users";
const pet = "pets";

export class Mongo {
  public static client: MongoClient;
  public static db: Db;

  public static connect = (uri: string): Promise<Db> =>
    MongoClient.connect(uri, { ignoreUndefined: true })
      .then((client) => (Mongo.client = client))
      .then((client) => (Mongo.db = client.db()));

  private static collection = <T>(name: string) => Mongo.db.collection<T>(name);
  public static close = () => Mongo.client.close();

  public static pet = () => Mongo.collection<Pet>(pet);
  public static user = () => Mongo.collection<User>(user);
}
