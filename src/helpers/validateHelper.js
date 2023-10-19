import { validationResult } from 'express-validator'

// Manejo de Errores de Express-Validator
const validateHelper = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (err) {
    res.status(403) // Errores detectados en el formulario
    res.send({ errors: err.array() })
  }
}

export { validateHelper }

export default validateHelper
