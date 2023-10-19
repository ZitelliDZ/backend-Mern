import {
  loggerCustom500,
  loggerCustom400,
  logger
} from '../config/logConfig.js'
import * as fs from 'fs'

// Manejador de errores Personalizados
const errorCustomConfig = async (error, req, res, next) => {
  let file = await fs.readFileSync(process.cwd() + '/src/logs/messages.json', 'utf8')
  file = await file.trim()
  const datos = await JSON.parse(file)
  const dato = datos[error.code ? error.code : (error.statusCode ? error.statusCode : 500)]
  const statusCode = await Number(dato.code)
  const message = dato.message

  if (error) {
    switch (true) {
      case statusCode >= 500:
        loggerCustom500.error({
          stack: error.error?.stack,
          originalUrl: req.originalUrl,
          user: req.user,
          statusCode,
          message
        })
        return res.status(statusCode).send({ errors: [{ msg: message }] })
      case statusCode < 500:
        loggerCustom400.error({
          stack: error.error?.stack,
          originalUrl: req.originalUrl,
          user: req.user,
          statusCode,
          message
        })
        return res.status(statusCode).send({ errors: [{ msg: message }] })
      default:
        return res.status(500).send({ errors: [{ msg: message }] })
    }
  }
  next()
}

// Middleware
const errorHandle = (app) => {
  app.use(logger)
  app.use(errorCustomConfig)
}

export default errorHandle
