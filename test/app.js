import express from 'express'
import dotenv from 'dotenv'
import setTZ from 'set-tz'
// config
import connectDB from '../src/config/dbConfig.js'
import swaggerHandle from '../src/middleware/swaggerHandle.js'
// cors
import corsHandle from '../src/middleware/corsHandle.js'
// Helmet
import helmetConfig from '../src/config/helmetConfig.js'

// middlewares
import errorHandle from '../src/middleware/errorHandle.js'
// Certificado SSL
import sv from '../src/config/sslConfig.js'
import parseToString from '../src/middleware/parseToStringHandle.js'
import routesController from '../src/routes/routesController.js'

const app = express()
setTZ('America/Buenos_Aires')

app.disable('x-powered-by')
// SSL
const server = sv(app)

// Middleware Swagger
swaggerHandle(app)

// Cors
corsHandle(app)
// Convierte parametros en string
parseToString(app, express)

dotenv.config({ path: '.env' }) // carga las variables de entorno
await connectDB() // conecta la base de datos a partir de la funcion creada en la carpeta config

// Helmet
helmetConfig(app)
// Routing
routesController(app)

// Middleware Errores
errorHandle(app)

export default server
