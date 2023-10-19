// rutas
import rolesRoutes from './roles/rolesRoutes.js'
import resourceRoutes from './resource/resourceRoutes.js'
import professorRoutes from './professorship/professorshipRoutes.js'
import classroomRoutes from './classroom/classroomRoutes.js'
import classdayRoutes from './classday/classdayRoutes.js'
import attendancesTypeRoutes from './attendancesType/attendancesTypeRoutes.js'
import authController from './auth/authRoutes.js'

// Routing
const routesController = (app) => {
  app.use('/api', rolesRoutes)
  app.use('/api', resourceRoutes)
  app.use('/api', professorRoutes)
  app.use('/api', classroomRoutes)
  app.use('/api', classdayRoutes)
  app.use('/api', attendancesTypeRoutes)
  authController(app)
}

export default routesController
