// Middleware para manejar errores de CORS
import { cors, corsOptions } from '../config/corsConfig.js'
const corsHandle = (app) => {
  app.use(cors(corsOptions))
  app.use(function customErrorHandler (_err, _req, res, _next) {
    return res.status(400).send({ errors: [{ msg: 'Error de cors.' }] })
  })
}

export default corsHandle
