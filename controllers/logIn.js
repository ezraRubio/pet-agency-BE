import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userLogIn = async (req, res) => {
  const user = req.body;
  try {
    const dbUser = await User.findOne({ email: user.email });
    if (dbUser && (await bcrypt.compare(user.password, dbUser.password))) {
      const token = jwt.sign({ role: dbUser.role, uid:dbUser._id}, process.env.JWT_SECRET, {expiresIn: "10h"});
      return res.status(200).json({uid:dbUser._id, role:dbUser.role, token });
    } else return res.status(401).send("wrong email or password");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
