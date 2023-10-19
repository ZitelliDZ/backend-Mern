
import { check, param } from 'express-validator'
import { verifyJWT } from '../../helpers/generateJWT.js'
import validateHelper from '../../helpers/validateHelper.js'


const validateGetProfessorship = [
  check('authorization')
    .custom(async (value, { _req }) => {
      const token = value.split(' ')[1]
      verifyJWT(token)
    })
    .withMessage('El token no es válido.'),

  param('id')
    .exists().withMessage('La cátedra es requerida.')
    .not().isEmpty().withMessage('La cátedra es requerida.')
    .isMongoId().withMessage('La cátedra no es válida.'),

  (req, res, next) => {
    validateHelper(req, res, next)
  }
]


const validateGetInfoProfessorship = [
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

  param('semester').isMongoId()
    .exists().withMessage('El semestre es requerido.')
    .not().isEmpty().withMessage('El semestre es requerido.')
    .withMessage('El semestre no es válido.'),

  (req, res, next) => {
    validateHelper(req, res, next)
  }
]


export {
  validateGetInfoProfessorship,
  validateGetProfessorship
}