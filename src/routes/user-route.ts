import { userController } from '../controller/user-controller'
import userValidation from '../middlewares/user-validation'
import { validate } from '../middlewares/validations'

import express from 'express'

const userRouter = express.Router()

userRouter.post('/register', userValidation(), validate, userController.register)

export default userRouter