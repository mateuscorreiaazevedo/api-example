import mongoose from 'mongoose'
import env from '../config/env'

export const connect = async () => {
  try {
    const dbConnect = await mongoose.connect(
      `mongodb+srv://${env.dbUser}:${env.dbPass}@react-gram.1twxj9b.mongodb.net/?retryWrites=true&w=majority`
    )
    console.log('connect to database')
    return dbConnect
  } catch (error: any) {
    console.error(error.message)
  }
}