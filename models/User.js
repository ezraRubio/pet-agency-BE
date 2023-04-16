import mongoose from "mongoose";

const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const phoneRegex = /^\d{10}$/;
const nameRegex = /^[A-Za-z]{1,10}$/;
// const roles = ["admin", "user"];

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, match: emailRegex },
  password: { type: String, required: true, maxLength: 500 },
  firstName: { type: String, match: nameRegex },
  lastName: { type: String, match: nameRegex },
  phone: { type: String, match: phoneRegex },
  role: { type: String, enum: roles, default: roles[1], maxLength: 500 },
  bio: { type: String, maxLength: 500 },
  petsSaved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
  petsAdopted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
});

const User = mongoose.model("User", userSchema);

export default User;
