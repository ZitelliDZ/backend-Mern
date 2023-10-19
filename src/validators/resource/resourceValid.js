import { check } from 'express-validator'
import validateHelper from '../../helpers/validateHelper.js'
import { verifyJWT } from '../../helpers/generateJWT.js'


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



const validateGetProfessorships = [
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
  validateProfile,
  validateGetProfessorships
}

