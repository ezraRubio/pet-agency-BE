import "express-async-errors";
import { app } from "./app";
import config from "./config";
//import Mongo instance

//Connect Mongo instance
// Mongo.connect(config.URI)
//     .then(() => app.listen(config.PORT))
//     .then(() => console.log("app running on: ", config.PORT))
//     .catch((e) => console.error("app not running", e))