import jwt from 'jsonwebtoken'

// Generar jesonWebToken
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
}

// Verifica jesonWebToken
const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

export { generateJWT, verifyJWT }

export default generateJWT
