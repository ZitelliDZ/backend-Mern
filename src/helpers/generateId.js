// Funcion para generar un id unico a partir de la fecha + un numero random
const generateId = () => {
  const date = Date.now().toString(32)
  const random = Math.random().toString(32).substring(2)
  return random + date
}

function generateRandomNumber () {
  return Math.floor(100000 + Math.random() * 900000)
}

export { generateId, generateRandomNumber }

export default generateId
