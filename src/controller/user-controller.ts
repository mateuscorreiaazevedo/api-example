import { Request, Response } from 'express'
import { User } from '../models/user-model'
import env from '../config/env'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import authValidation from '../middlewares/auth-validation'

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

    const crypt = await bcrypt.genSalt(12)
    const passHash = await bcrypt.hash(password, crypt)

    const newUser = await User.create({
      userName,
      email,
      password: passHash
    })
    
    if(!newUser) {
      res.status(422).json({errors: ['Erro no servidor, por favor tente mais tarde.']})
      return
    }
    
    res.status(201).json({
      _id: newUser._id,
      token: generateToken(newUser._id)
    })
  }

  async login (req: Request, res: Response) {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    
    if(!user) {
      res.status(404).json({errors: ['Usuário não cadastrado.']})
      return
    }

    const passwordChecked = await bcrypt.compare(password, (user?.password as string ))

    if(!passwordChecked) {
      res.status(422).json({errors: ['Senha incorreta.']})
      return
    }

    res.status(201).json({
      _id: user?._id,
      userAvatar: user?.userAvatar,
      token: generateToken(user?._id as any)
    })
  }
  async getCurrentUser (req: Request, res: Response) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const { id } = jwt.decode(token!, env.jwtSecret as jwt.DecodeOptions)
    const user = await User.findById(id).select('-password')

    if (!user) {
      res.status(404).json({ message: 'usuário não encontrado' })
      return
    }

    res.status(200).json(user)
  }
}

export const userController = new UserController()