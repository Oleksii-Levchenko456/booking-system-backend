import { User } from '../models/user.js';

export const getUsers = async (req, res) => {
  const users = await User.find(req.query);
  res.status(200).json(users);
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
};

export const createUser = async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!updateUser) {
    res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ message: 'User deleted successfully' });
};
