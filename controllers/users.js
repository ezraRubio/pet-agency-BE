import User from "../models/User.js";
import bcrypt from 'bcrypt';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

export const editUser = async (req, res) => {
  const id = req.params.id;
  try {
    const dbUser = await User.findById(id)
    if (req.body.password!==dbUser.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user = {...req.body, password: hashedPassword}
      const editedUser = new User(user);
      await editedUser.validate().then(err=>err && res.status(409).json({message: err.message}))
      const updatedUser = await User.findByIdAndUpdate(id, editedUser, {"returnDocument":"after"});
      return res.status(201).json(updatedUser);
    } else {
      const editedUser = new User(req.body);
      const updatedUser = await User.findByIdAndUpdate(id, editedUser, {"returnDocument":"after"});
      return res.status(201).json(updatedUser);
    }
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

export const checkToken = (req, res) => {
  return res.status(200).json({role: req.role, uid: req.uid, tokenExp: req.tokenExp})
}