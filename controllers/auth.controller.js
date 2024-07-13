import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  const { username, email, password, phone } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    phone,
  });
  try {
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log("lỗi", error);
    res.status(500).json({ message: error.message });
  }
};
