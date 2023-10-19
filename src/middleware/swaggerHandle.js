import swaggerUI from 'swagger-ui-express'
import pc from 'picocolors'

import swaggerSpec from '../config/swaggerConfig.js'

const url = process.env.APP_URL + ':' + process.env.APP_PORT

// Función para configurar documentación
const swaggerHandle = (app) => {
  app.use(
    '/api-doc',
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, {
      swaggerOptions: { persistAuthorization: true }
    })
  )
  app.use('/api-doc.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  console.log(
    `📚 Swagger Funcionando en ${pc.green(pc.italic(url + '/api-doc'))} y en ${pc.green(pc.italic(url + '/api-doc.json'))}`
  )
}

export default swaggerHandle
