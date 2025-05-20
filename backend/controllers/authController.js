// controllers/authController.js
import jwt from 'jsonwebtoken'
import bcrypt  from 'bcryptjs'
import userModel from '../models/User.js';

const signup = async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new userModel({ username, password: hashed });
  await user.save();
  res.status(201).json({ message: "User created" });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};


export {signup, login}