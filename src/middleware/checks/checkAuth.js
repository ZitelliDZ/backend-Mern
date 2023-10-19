import User from '../../models/User.js'
import { verifyJWT } from '../../helpers/generateJWT.js'
import Infouser from '../../models/Infouser.js'

// Valida que el usuario este Autenticado
const checkAuth = async (req, _res, next) => {
  let token
  let tokenCode

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    let decoded

    try {
      tokenCode = req.headers.authorization.split(' ')[1]
      decoded = verifyJWT(tokenCode)
    } catch (error) {
      return next({ error, code: '10' })
    }
    // Guardar el usuario en la request
    const user = await User.findById(decoded.id).select(
      '-password -createdAt -updatedAt -isDeleted -__v'
    )

    if (!user) {
      return next({ error: new Error(), code: '11' }) // Adulteración del token
    }

    const infoUser = await Infouser.findById(user.infouser)
    if (!infoUser) {
      return next({ error: new Error(), code: '6' })
    }

    if (!await infoUser.verifySessionToken(tokenCode)) {
      return next({ error: new Error(), code: '10' })
    }

    if (await infoUser.verifyExpireToken()) {
      return next({ error: new Error(), code: '12' })
    }

    try {
      infoUser.recoverytoken = ''
      await infoUser.save()
      req.user = {
        _id: decoded.id,
        user,
        email: user.email,
        dni: user.dni,
        name: user.name
      }
      return next()
    } catch (error) {
      return next({ error, code: '14' })
    }
  }

  if (!token) {
    return next({ error: new Error(), code: '13' })
  }
  next()
}

// Verifica la existencia de un usuario logueado
const checkUser = async (req, _res, next) => {
  let tokenCode

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    let decoded

    try {
      tokenCode = req.headers.authorization.split(' ')[1]
      decoded = verifyJWT(tokenCode)
    } catch (error) {
      return next({ error, code: '10' })
    }

    const user = await User.findById(decoded.id).select(
      '-password -createdAt -updatedAt -isDeleted -__v'
    )

    const infoUser = await Infouser.findById(user.infouser)
    if (!infoUser) {
      return next({ error: new Error(), code: '6' })
    }

    if (!await infoUser.verifySessionToken(tokenCode)) {
      return next({ error: new Error(), code: '10' })
    }

    if (await infoUser.verifyExpireToken()) {
      return next({ error: new Error(), code: '12' })
    }
    try {
      infoUser.sessiontoken = ''
      await infoUser.save()
      req.user = {
        email: user.email,
        dni: user.dni,
        name: user.name
      }
      return next()
    } catch (error) {
      return next({ error, code: '14' })
    }
  }
  next()
}

export default checkAuth

export { checkAuth, checkUser }
