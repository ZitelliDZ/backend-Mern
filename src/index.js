import pc from 'picocolors'
import server from './app.js'

const PORT = process.env.APP_PORT

// App Server
server.listen(PORT, () => {
  console.log(`🚀 Server Escuchando en el puerto: ${pc.cyan(pc.italic(PORT))}`)
})


export default server

