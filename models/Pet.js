import mongoose from "mongoose";

const status = ["Available", "Adopted", "Fostered"];

const petSchema = mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true, maxLength: 500 },
  status: {
    type: String,
    required: true,
    maxLength: 500,
    enum: status,
    default: status[0],
  },
  picture: { type: String, maxLength: 500 },
  pictureId: { type: String, maxLength: 500 },
  height: { type: Number, min: 0, max: 200, default: 0 },
  weight: { type: Number, min: 0, max: 200, default: 0 },
  color: { type: String, maxLength: 500 },
  bio: { type: String, maxLength: 500 },
  hypoallergenic: Boolean,
  diet: Array,
  breed: { type: String, maxLength: 500 },
});

const Pet = mongoose.model("Pet", petSchema);

export default Pet;
