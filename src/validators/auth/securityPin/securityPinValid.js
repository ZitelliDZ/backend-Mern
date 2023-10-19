import { check, param, body } from 'express-validator'
import { verifyJWT } from '../../../helpers/generateJWT.js'
import validateHelper from '../../../helpers/validateHelper.js'


const validateVerifyPin = [
  check('authorization')
    .custom(async (value, { _req }) => {
      const token = value.split(' ')[1]
      verifyJWT(token)
    })
    .withMessage('El token no es válido.'),

  param('pin')
    .exists()
    .withMessage('El pin es requerido.')
    .isNumeric()
    .withMessage('El pin no es válido.')
    .isLength({ min: 6, max: 6 })
    .withMessage('El pin debe tener 6 caracteres.')
    .not()
    .isEmpty()
    .withMessage('El pin es requerido.'),

  (req, res, next) => {
    validateHelper(req, res, next)
  }
]

const validateNewPin = [
  check('authorization')
    .custom(async (value, { _req }) => {
      const token = value.split(' ')[1]
      verifyJWT(token)
    })
    .withMessage('El token no es válido.'),
  param('token').isAlphanumeric().withMessage('El token no es válido.'),

  body('pin')
    .exists()
    .withMessage('El pin es requerido.')
    .isNumeric()
    .withMessage('El pin no es válido.')
    .isLength({ min: 6, max: 6 })
    .withMessage('El pin debe tener 6 caracteres')
    .not()
    .isEmpty()
    .withMessage('El pin es requerido.'),

  (req, res, next) => {
    validateHelper(req, res, next)
  }
]

const validateResetPin = [
  check('authorization')
    .custom(async (value, { _req }) => {
      const token = value.split(' ')[1]
      verifyJWT(token)
    })
    .withMessage('El token no es válido.'),

  (req, res, next) => {
    validateHelper(req, res, next)
  }
]
export {
  validateVerifyPin,
  validateNewPin,
  validateResetPin
}