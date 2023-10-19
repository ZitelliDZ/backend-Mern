import { check, param, body } from 'express-validator'
import validateHelper from '../../../helpers/validateHelper.js'
import { verifyJWT } from '../../../helpers/generateJWT.js'


const validateAuthenticate = [
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
  body('personalPhoneId')
    .exists()
    .withMessage('El dispositivo mobile es requerido.')
    .isString()
    .withMessage('El dispositivo mobile debe ser una cadena de caracteres alfanuméricos.')
    .not()
    .isEmpty()
    .withMessage('El dispositivo mobile es requerido.'),
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
const validateProfile = [
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
const validateChangeInitialData = [
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
  body('personalPhoneId')
    .exists()
    .withMessage('El dispositivo mobile es requerido.')
    .isString()
    .withMessage('El dispositivo mobile debe ser una cadena de caracteres alfanuméricos.')
    .not()
    .isEmpty()
    .withMessage('El dispositivo mobile es requerido.'),
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
const validateVerifyToken = [
  body('token').isAlphanumeric().withMessage('El token no es válido.')
    .isLength({ min: 6, max: 6 })
    .withMessage('El token debe tener 6 caracteres'),

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

const validateRegister = [
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

  body('rol')
    .exists()
    .withMessage('El rol es requerido.')
    .not()
    .isEmpty()
    .withMessage('El rol es requerido.')
    .isString()
    .withMessage('El rol no es válido.')
    .isIn(['Bedel', 'Estudiante', 'Profesor', 'Admin'])
    .withMessage('El valor del campo "rol" debe ser alguno de los siguientes: Admin, Profesor, Bedel o Estudiante.'),

  body('email')
    .exists()
    .withMessage('El email es requerido.')
    .isEmail()
    .withMessage('Email no es válido.')
    .not()
    .isEmpty()
    .withMessage('El email es requerido.'),

  body('name')
    .exists()
    .withMessage('El nombre es requerido.')
    .not()
    .isEmpty()
    .withMessage('El nombre es requerido!.'),

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
  validateAuthenticate,
  validateRegister,
  validateVerifyToken,
  validateChangeInitialData,
  validateProfile
}