import { param, body } from 'express-validator'
import validateHelper from '../../../helpers/validateHelper.js'


const validateIncludeMobileId = [
  param('token').isAlphanumeric().withMessage('El token no es válido.'),

  body('personalPhoneId')
    .exists()
    .withMessage('El dispositivo mobile es requerido.')
    .isString()
    .withMessage('El dispositivo mobile debe ser una cadena de caracteres alfanuméricos.')
    .not()
    .isEmpty()
    .withMessage('El dispositivo mobile es requerido.'),

  (req, res, next) => {
    validateHelper(req, res, next)
  }
]

export {
  validateIncludeMobileId
}