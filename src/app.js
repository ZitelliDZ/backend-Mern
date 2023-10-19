import express from 'express'
import dotenv from 'dotenv'
// config
import connectDB from './config/dbConfig.js'
import swaggerHandle from './middleware/swaggerHandle.js'
// cors
import corsHandle from './middleware/corsHandle.js'
// Helmet
import helmetConfig from './config/helmetConfig.js'

// middlewares
import errorHandle from './middleware/errorHandle.js'
// Certificado SSL
import sv from './config/sslConfig.js'
import parseToString from './middleware/parseToStringHandle.js'
import setTZ from 'set-tz'
import routesController from './routes/routesController.js'

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
