import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'
import swaggerJsDoc from 'swagger-jsdoc'

dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Metadata de la Documentación en Swagger
const optionsSwagger = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Sistema Gestor de Asistencia UGD',
      version: '1.0.0',
      description: 'Api del Sistema de Gestión de Asistencia UGD'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    servers: [
      {
        url: process.env.APP_URL + ':' + process.env.APP_PORT
      }
    ]
  },
  apis: [// Archivos de lectura para la documentación hecha con swagger
    `${join(__dirname, '../routes/**/*.js')}`,
    `${join(__dirname, '../models/**/*.js')}`
  ]
}

// Documentación en Formato Json
const swaggerSpec = swaggerJsDoc(optionsSwagger)

export default swaggerSpec
