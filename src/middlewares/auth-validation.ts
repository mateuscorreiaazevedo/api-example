import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import env from '../config/env'

type RequestUser = Request & {
  user: any
}

const authValidation =async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if(!token) res.status(401).json({errors: ['Unauthorized user.']})

  try {
    jwt.verify(token!, env.jwtSecret)

    next()
  } catch (error: any) {
    res.status(401).json({
      errors: ['Invalid token.']
    })
  }

}

export default authValidation