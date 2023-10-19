import { check, param } from 'express-validator'
import validateHelper from '../../helpers/validateHelper.js'
import { verifyJWT } from '../../helpers/generateJWT.js'

const validateGetClassrooms = [
  check('authorization')
    .custom(async (value, { _req }) => {
      const token = value.split(' ')[1]
      verifyJWT(token)
    })
    .withMessage('El token no es válido.'),

  param('id')
    .exists().withMessage('El departamento es requerido.')
    .not().isEmpty().withMessage('El departamento es requerido.')
    .isMongoId().withMessage('El departamento no es válido.'),

  (req, res, next) => {
    validateHelper(req, res, next)
  }
]

export {
  validateGetClassrooms
}
