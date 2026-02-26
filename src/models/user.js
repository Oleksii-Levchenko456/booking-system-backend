import { model, Schema } from 'mongoose';

export const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['client', 'business'],
    default: 'client',
  },
});
export const User = model('User', userSchema);
