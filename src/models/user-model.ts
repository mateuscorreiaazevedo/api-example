import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    password: String,
    userAvatar: String,
    biography: String 
  },
  {
    timestamps: true
  }
)

export const User = mongoose.model('User', userSchema)