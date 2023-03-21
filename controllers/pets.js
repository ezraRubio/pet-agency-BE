import Pet from "../models/Pet.js";
import User from "../models/User.js";
import cloudinary from "../src/utils/cloudinary.cjs";

export const getPets = async (req, res) => {
  try {
    const searchQuery = req.query;
    const pets = await Pet.find(searchQuery);

    !pets && res.status(401).send("no pets");

    return res.status(200).json(pets);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const addPet = async (req, res) => {
  try {
    if (req.file) {
      const cloudResult = await cloudinary.uploader.upload(req.file.path);
      const pet = {
        ...req.body,
        picture: cloudResult.secure_url,
        pictureId: cloudResult.public_id,
      };
      const newPet = new Pet(pet);
      await newPet.save();
      return res.status(201).json(newPet);
    } else {
      const newPet = new Pet(req.body);
      await newPet.save();
      return res.status(201).json(newPet);
    }
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

export const getPetById = async (req, res) => {
  const id = req.params.id;
  try {
    const pet = await Pet.findById(id);
    return res.status(200).json(pet);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

export const editPet = async (req, res) => {
  const id = req.params.id;
  try {
    if (req.file) {
      const petToEdit = await Pet.findById(id);
      petToEdit.pictureId &&
        (await cloudinary.uploader.destroy(petToEdit.pictureId));
      const cloudResult = await cloudinary.uploader.upload(req.file.path);
      const pet = {
        ...req.body,
        picture: cloudResult.secure_url,
        pictureId: cloudResult.public_id,
      };
      const editedPet = new Pet(pet);
      editedPet.validate().then(err=>err && res.status(409))
      const updatedPet = await Pet.findByIdAndUpdate(id, editedPet, {
        returnDocument: "after",
      });
      return res.status(201).json(updatedPet);
    } else {
      const editedPet = new Pet(req.body);
      const updatedPet = await Pet.findByIdAndUpdate(id, editedPet, {
        returnDocument: "after",
      });
      return res.status(201).json(updatedPet);
    }
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

export const adoptPet = async (req, res) => {
  const id = req.params.id;

  try {
    const pet = await Pet.findById(id);
    if (pet.status === "Adopted")
      return res.status(401).send("pet not available");
    else if (req.body.isFostering) pet.status = "Fostered";
    else pet.status = "Adopted";

    const updatedPet = await Pet.findByIdAndUpdate(id, pet, {
      returnDocument: "after",
    });

    const user = await User.findById(req.uid);
    if (user.petsAdopted.some((pet) => pet._id.toString() === id))
      return res.status(401).send("pet already adopted");

    user.petsAdopted.push(updatedPet._id);
    const updatedUser = await User.findByIdAndUpdate(req.uid, user, {
      returnDocument: "after",
    }).populate("petsAdopted");
    return res.status(201).json(updatedUser.petsAdopted);
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

export const returnPet = async (req, res) => {
  const id = req.params.id;

  try {
    const pet = await Pet.findById(id);
    pet.status = "Available";
    await Pet.findByIdAndUpdate(id, pet);

    const user = await User.findById(req.uid);
    const updatedAdopted = user.petsAdopted.filter(
      (pet) => pet._id.toString() !== id
    );
    user.petsAdopted = updatedAdopted;
    const updatedUser = await User.findByIdAndUpdate(req.uid, user, {
      returnDocument: "after",
    }).populate("petsAdopted");
    return res.status(201).json(updatedUser.petsAdopted);
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

export const savePet = async (req, res) => {
  const petId = req.params.id;

  try {
    const user = await User.findById(req.uid);
    if (user.petsSaved.some((pet) => pet._id.toString() === petId))
      return res.status(401).send("pet already saved");

    user.petsSaved.push(petId);
    const updatedUser = await User.findByIdAndUpdate(req.uid, user, {
      returnDocument: "after",
    }).populate("petsSaved");

    return res.status(201).json(updatedUser.petsSaved);
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

export const deleteSavedPet = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(req.uid);
    const savedPets = user.petsSaved.filter((pet) => pet._id.toString() !== id);
    user.petsSaved = savedPets;
    const updatedUser = await User.findByIdAndUpdate(req.uid, user, {
      returnDocument: "after",
    }).populate("petsSaved");
    return res.status(201).json(updatedUser.petsSaved);
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

export const getPetsByUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id)
      .populate("petsSaved")
      .populate("petsAdopted");
    return res
      .status(201)
      .json({ saved: user.petsSaved, adopted: user.petsAdopted });
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};
