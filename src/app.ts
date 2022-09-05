import router from './routes/router'
import env from './config/env'
import express from 'express'
import path from 'path'
import cors from 'cors'
import { connect } from './service/db'

const app = express()

// JSON
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Cors
app.use(cors({
  credentials: true, origin: 'http://localhost:3000'
}))

// Uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Routes
app.use(router)


app.listen(env.port, async () => {
  await connect()
  console.log('app is ready!', env.port)
})