import { check, param, body } from 'express-validator'
import validateHelper from '../../helpers/validateHelper.js'
import { verifyJWT } from '../../helpers/generateJWT.js'



const validatePresentStudentList = [
  check('authorization')
    .custom(async (value, { _req }) => {
      const token = value.split(' ')[1]
      verifyJWT(token)
    })
    .withMessage('El token no es válido.'),

  param('id').isMongoId()
    .exists().withMessage('La clase es requerida.')
    .not().isEmpty().withMessage('La clase es requerida.')
    .withMessage('La clase no es válida.'),

  (req, res, next) => {
    validateHelper(req, res, next)
  }
]

const validateAttendanceRecordWithPin = [
  check('authorization')
    .custom(async (value, { _req }) => {
      const token = value.split(' ')[1]
      verifyJWT(token)
    })
    .withMessage('El token no es válido.'),

  param('id').isMongoId().withMessage('La clase no es válida.')
    .exists().withMessage('La clase es requerida.')
    .not().isEmpty().withMessage('La clase es requerida.'),

  body('localized')
    .exists()
    .withMessage('La localización es requerida.')
    .isBoolean()
    .withMessage('La localización debe ser un valor booleano.')
    .not()
    .isEmpty()
    .withMessage('La localización es requerida.'),
  body('pin')
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

const validateAttendanceRecord = [
  check('authorization')
    .custom(async (value, { _req }) => {
      const token = value.split(' ')[1]
      verifyJWT(token)
    })
    .withMessage('El token no es válido.'),

  param('id').isMongoId().withMessage('La clase no es válida.')
    .exists().withMessage('La clase es requerida.')
    .not().isEmpty().withMessage('La clase es requerida.'),

  body('localized')
    .exists()
    .withMessage('La localización es requerida.')
    .isBoolean()
    .withMessage('La localización debe ser un valor booleano.')
    .not()
    .isEmpty()
    .withMessage('La localización es requerida.'),

  (req, res, next) => {
    validateHelper(req, res, next)
  }
]

const validateAddAttendance = [
  check('authorization')
    .custom(async (value, { _req }) => {
      const token = value.split(' ')[1]
      verifyJWT(token)
    })
    .withMessage('El token no es válido.'),

  param('id')
    .exists().withMessage('La clase es requerida.')
    .not().isEmpty().withMessage('La clase es requerida.')
    .isMongoId().withMessage('La clase no es válida.'),

  body('user')
    .exists()
    .withMessage('El usuario es requerido.')
    .not()
    .isEmpty()
    .withMessage('El usuario es requerido.')
    .isMongoId().withMessage('El usuario no es válido.'),
  body('rol')
    .exists()
    .withMessage('El rol es requerido.')
    .not()
    .isEmpty()
    .withMessage('El rol es requerido.')
    .isMongoId().withMessage('El rol no es válido.'),
  body('attendanceType')
    .exists()
    .withMessage('El tipo de asistencia es requerido.')
    .not()
    .isEmpty()
    .withMessage('El tipo de asistencia es requerido.')
    .isMongoId().withMessage('El tipo de asistencia no es válido.'),

  (req, res, next) => {
    validateHelper(req, res, next)
  }
]


const validateAttendanceList = [
  check('authorization')
    .custom(async (value, { _req }) => {
      const token = value.split(' ')[1]
      verifyJWT(token)
    })
    .withMessage('El token no es válido.'),

  param('id').isMongoId()
    .exists().withMessage('La clase es requerida.')
    .not().isEmpty().withMessage('La clase es requerida.')
    .withMessage('La clase no es válida.'),

  (req, res, next) => {
    validateHelper(req, res, next)
  }
]


const validateFinishClassday = [
  check('authorization')
    .custom(async (value, { _req }) => {
      const token = value.split(' ')[1]
      verifyJWT(token)
    })
    .withMessage('El token no es válido.'),

  param('id').isMongoId()
    .exists().withMessage('La clase es requerida.')
    .not().isEmpty().withMessage('La clase es requerida.')
    .withMessage('La clase no es válida.'),

  (req, res, next) => {
    validateHelper(req, res, next)
  }
]



const validateGetClassdays = [
  check('authorization')
    .custom(async (value, { _req }) => {
      const token = value.split(' ')[1]
      verifyJWT(token)
    })
    .withMessage('El token no es válido.'),

  param('professorship')
    .exists().withMessage('La cátedra es requerida.')
    .not().isEmpty().withMessage('La cátedra es requerida.')
    .isMongoId().withMessage('La cátedra no es válida.'),

  param('id').isMongoId()
    .exists().withMessage('El semestre es requerido.')
    .not().isEmpty().withMessage('El semestre es requerido.')
    .withMessage('El semestre no es válido.'),

  (req, res, next) => {
    validateHelper(req, res, next)
  }
]
export {
  validateGetClassdays,
  validatePresentStudentList,
  validateAttendanceRecordWithPin,
  validateAttendanceRecord,
  validateAddAttendance,
  validateAttendanceList,
  validateFinishClassday
}