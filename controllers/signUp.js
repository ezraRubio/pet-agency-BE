import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userSignUp = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = {...req.body, password:hashedPassword};
    const newUser = new User(user);
    await newUser.save();
    const token = jwt.sign({role: newUser.role, uid:newUser._id}, process.env.JWT_SECRET, {expiresIn: "20m"})
    return res.status(201).json({uid: newUser._id, token});
  } catch (error) {
    return res.status(500).json(error.message)
  }
};
