import { body } from 'express-validator'

export default function userValidation () {
  return [
    body('userName')
      .isString().withMessage('O nome de usuário é obrigatório.')
      .isLength({min: 4}).withMessage('O nome de usuário deve conter no mínimo 4 caracteres.'),
    body('email')
      .isString().withMessage('O email é obrigatório.')
      .isEmail().withMessage('Endereço de email inválido.'),
    body('password')
      .isString().withMessage('A senha é obrigatória.')
      .isLength({min: 6}).withMessage('A senha deve conter no mínimo 6 caracters.'),
    body('confirmPassword')
      .isString().withMessage('A confirmação de senha é obrigatória.')
      .custom((value, { req }) => {
        if (value !== req.body.password) throw new Error('A senhas devem ser iguais.')
        return true
      })
  ]
}