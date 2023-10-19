const parseToString = (app, express) => {
  app.use(express.json())

  app.use((req, res, next) => {
    // Iterar a través de los parámetros en el cuerpo de la solicitud
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        // Convertir el valor del parámetro en cadena de texto
        req.body[key] = String(req.body[key])
      }
    }
    next()
  })
}

export default parseToString
