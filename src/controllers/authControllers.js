import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.status(400).json({ message: 'Email already in use' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    role,
    passwordHash: hashedPassword,
  });

  const token = jwt.sign(
    { id: newUser._id, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: '5d' },
  );
  res.status(201).json({
    message: 'User registered successfully',
    token,
    user: {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
    },
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email: email });
  if (!userExists) {
    return res.status(404).json({ message: 'User not found' });
  }
  const isMatch = await bcrypt.compare(password, userExists.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign(
    {
      id: userExists._id,
      role: userExists.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '5d' },
  );
  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: userExists._id,
      name: userExists.name,
      role: userExists.role,
      email: userExists.email,
    },
  });
};
