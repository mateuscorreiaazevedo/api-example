import mongoose from 'mongoose'

const photoSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.isObjectIdOrHexString,
    userName: String
  },
  {
    timestamps: true
  }
)

export const Photo = mongoose.model('Photo', photoSchema)