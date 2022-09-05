import * as dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.PORT || 9002,
  jwtSecret: process.env.JWT_SECRET,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS
}