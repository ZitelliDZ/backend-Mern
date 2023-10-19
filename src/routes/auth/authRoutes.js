
import loginRoutes from './login/loginRoutes.js'
import secPasswordRoutes from './securityPassword/securityPasswordRoutes.js'
import secPinRoutes from './securitypin/securityPinRoutes.js'
import secMobileRoutes from './securityIdMobile/securityIdMobileRoutes.js'

// Routing
const authController = (app) => {
  app.use('/api/users', loginRoutes)
  app.use('/api/users', secPasswordRoutes)
  app.use('/api/users', secPinRoutes)
  app.use('/api/users', secMobileRoutes)
}

export default authController
