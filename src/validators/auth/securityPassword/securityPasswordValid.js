import { param, body } from 'express-validator'
import validateHelper from '../../../helpers/validateHelper.js'



const validateResetPassword = [
  body('dni')
    .exists()
    .withMessage('El dni es requerido.')
    .isNumeric()
    .withMessage('El dni no es válido.')
    .isLength({ min: 8, max: 8 })
    .withMessage('El dni debe tener 8 caracteres')
    .not()
    .isEmpty()
    .withMessage('El dni es requerido.'),

  (req, res, next) => {
    validateHelper(req, res, next)
  }
]

const validateNewPassword = [
  param('token').isAlphanumeric().withMessage('El token no es válido.'),

  body('dni')
    .exists()
    .withMessage('El dni es requerido.')
    .isNumeric()
    .withMessage('El dni no es válido.')
    .isLength({ min: 8, max: 8 })
    .withMessage('El dni debe tener 8 caracteres')
    .not()
    .isEmpty()
    .withMessage('El dni es requerido.'),
  body('password')
    .exists()
    .withMessage('La contraseña es requerida.')
    .isLength({ min: 7 }) // Longitud mínima permitida
    .withMessage('La contraseña debe tener al menos 7 caracteres.')
    .isAlphanumeric()
    .withMessage('Ingrese solo caracteres alfanuméricos.')
    .not()
    .isEmpty()
    .withMessage('La contraseña es requerida.'),

  (req, res, next) => {
    validateHelper(req, res, next)
  }
]

export {
  validateResetPassword,
  validateNewPassword
}