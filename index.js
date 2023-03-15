import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { petRouter } from "./routes/pets.js";
import { userRouter } from "./routes/users.js";
import { signUp } from "./routes/signUp.js";
import { logIn } from "./routes/logIn.js";
import { search } from "./routes/search.js";
import auth from "./middleware/auth.js";
import {} from 'dotenv/config';
import helmet from "helmet";
const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use("/pet", auth, petRouter);
app.use("/user", auth, userRouter);
app.use("/signup", signUp);
app.use("/login", logIn);
app.use("/search", search);

const DB_URL =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dpcx6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 3300;

mongoose
  .connect(DB_URL)
  .then(() => app.listen(PORT, () => console.log("server running on port", PORT)))
  .catch((err) => console.log(err.message));