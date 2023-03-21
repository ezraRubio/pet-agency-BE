import config from "../src/config";
import { Mongo } from "../src/db/mongo";

describe("Server check", () => {
    it("should open and close DB connection without error", async () => {
        let error;
        try {
            config.URI && await Mongo.connect(config.URI)
            await Mongo.close();
        } catch (e) {
            error = e;            
        }
        expect(error).toBeUndefined();
    })
})