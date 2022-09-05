import { userController } from '../controller/user-controller'
import { validate } from '../middlewares/validations'

import express from 'express'

const userRouter = express.Router()

userRouter.post('/register', validate, userController.register)

export default userRouter