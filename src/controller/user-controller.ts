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
    const { userName, email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
      res.status(422).json({errors: ['Endereço de email já cadastrado.']})
      return
    }

    const crypt = await bcrypt.genSalt()
    const passHash = await bcrypt.hash(password, crypt)

    const newUser = await User.create({
      userName,
      email,
      password: passHash
    })
    
    if(!newUser) res.status(422).json({errors: ['Erro no servidor, por favor tente mais tarde.']})
    
    res.status(201).json({
      _id: newUser._id,
      token: generateToken(newUser._id)
    })
  }
}

export const userController = new UserController()