import { userController } from '../controller/user-controller'
import { userValidation } from '../middlewares/user-validation'
import { validate } from '../middlewares/validations'
import authValidation from '../middlewares/auth-validation'
import express from 'express'

const userRoute = express.Router()

userRoute.post('/register', userValidation.createValidation(), validate, userController.register)
userRoute.post('/login', userValidation.loginValidation(), validate, userController.login)
userRoute.get('/profile', authValidation, userController.getCurrentUser)

export default userRoute