import mongoose from 'mongoose'
import pc from 'picocolors'

// Crea la conexion a la base de datos de mongoDB
const connectDB = async () => {
  try {
    // Crea la conexión
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    // Url de acceso al servicio de MongoDB
    const url = `${connection.connection.host}:${connection.connection.port}`
    console.log(`🌱 Servidor MongoDB Conectado a:  ${pc.magenta(`${pc.italic(url)}`)}`)
    return connection
  } catch (error) {
    // Terminar cualquier proceso debido a que se considera recurso de primera necesidad
    process.exit(1)
  }
}

export default connectDB
