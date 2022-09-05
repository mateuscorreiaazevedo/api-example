import { Request, Response } from 'express'
import { User } from '../models/user-model'
import env from '../config/env'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateToken = (id: string | object) => {
  return jwt.sign({id}, env.jwtSecret as jwt.Secret, {
    expiresIn: '7d'
  })
}

class UserController {
  async register (req: Request, res: Response) {
      res.send('registro!')
  }
}

export const userController = new UserController()