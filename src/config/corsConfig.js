import cors from 'cors'

const whiteList = [process.env.FRONTEND_URL]

// Configuración de cors para la protección de las rutas y las funcionalidades
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true)
    } else {
      callback(null, true)
      // callback(new Error('Error de Cors!.'))
    }
  }
}

export { corsOptions, cors }
