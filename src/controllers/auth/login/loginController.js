import registrationEmail from "../../../helpers/generateEmail.js"
import Infouser from "../../../models/Infouser.js"
import Rol from "../../../models/Rol.js"
import User from "../../../models/User.js"



const authenticate = async (req, res, next) => {
  const { dni, password, personalPhoneId } = req.body
  const user = await User.findOne({ dni }).populate({
    path: 'roles',
    select: 'name'
  })

  // Comprobar si el usuario existe
  if (!user) {
    return next({ error: new Error(), code: '4' })
  }

  const infoUser = await Infouser.findById(user.infouser)
  if (!infoUser) {
    return next({ error: new Error(), code: '6' })
  }

  const isFirstLogin = infoUser.getFirstLogin()

  // Comprobar si su password es correcto
  if (!await user.verifyPassword(password)) {
    return next({ error: new Error(), code: '2' })
  }
  try {
    let mobile
    if (!infoUser.personalPhoneId || infoUser.personalPhoneId === '') {
      mobile = false
    } else {
      mobile = await infoUser.verifyMobile(personalPhoneId)
    }
    const info = await infoUser.createSessionUser(user)

    if (isFirstLogin) {
      const codigo = await infoUser.generateRecoverytokenpin()
      firstLoginEmail({
        dni: user.getDni(),
        email: user.getEmail(),
        name: user.getName(),
        token: codigo.token
      })
      // Enviar respuesta
      return res.json({
        msg: 'Logueado con éxito. Recibiras un email con un código.',
        _id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        roles: user.getRoles(),
        isFirstLogin,
        isSamePhoneId: mobile,
        token: info.token
      })
    }

    // Enviar respuesta
    return res.json({
      msg: 'Logueado con éxito.',
      _id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      roles: user.getRoles(),
      isFirstLogin,
      isSamePhoneId: mobile,
      token: info.token
    })
  } catch (error) {
    return next({ error: new Error(), code: '1' })
  }
}

const register = async (req, res, next) => {
  // Comprobar que no exista alguien registrado
  const { dni, rol, name, password, email } = req.body
  const userExists = await User.findOne({ dni })

  if (userExists) {
    return next({ error: new Error(), code: '17' })
  }

  // registrar
  try {
    const infoUser = await Infouser.createInfo(null, null, null, null, true, null)
    let user = await User.createUser(dni, name, password, email, infoUser._id, [])

    const userRol = await Rol.findOne({ name: rol })
    user = await user.addRol(userRol)

    registrationEmail({
      dni: user.dni,
      email: user.email,
      name: user.name,
      password
    })

    res.json({
      msg: 'Usuario almacenado correctamente, Llegará un email a su casilla de correo.'
    })
  } catch (error) {
    return next({ error, code: '18' })
  }
}
const verifyToken = async (req, res, next) => {
  // Confirmar que exista el token del usuario dentro de la base de datos
  const { token, dni } = req.body

  const user = await User.findOne({ dni })
  if (!user) {
    return next({ error: new Error(), code: '4' })
  }

  const validateToken = await Infouser.findById(user.infouser)

  if (!validateToken) {
    return next({ error: new Error(), code: '6' })
  }

  if (validateToken.recoverytokenmobile !== null && validateToken.recoverytokenmobile !== '' && !await validateToken.verifyRecoveryTokenMobile(token)) {
    return next({ error: new Error(), code: '7' })
  }
  if (validateToken.recoverytoken !== null && validateToken.recoverytoken !== '' && !await validateToken.verifyRecoveryToken(token)) {
    return next({ error: new Error(), code: '7' })
  }
  if (validateToken.recoverytokenpin !== null && validateToken.recoverytokenpin !== '' && !await validateToken.verifyRecoveryTokenPin(token)) {
    return next({ error: new Error(), code: '7' })
  }

  return res.json({
    msg: 'El token es válido.'
  })
}
const changeInitialData = async (req, res, next) => {
  const { token } = req.params
  const { pin, personalPhoneId, password } = req.body

  const user = await User.findById(req.user._id)
  if (!user) {
    return next({ error: new Error(), code: '4' })
  }

  const infoUser = await Infouser.findById(user.getInfouser())
  if (!infoUser) {
    return next({ error: new Error(), code: '6' })
  }

  if (infoUser.getFirstLogin()) {
    if (!await infoUser.verifyRecoveryTokenPin(token)) {
      return next({ error: new Error(), code: '7' })
    }

    try {
      await user.changePassword(password)
      await infoUser.changePassword()
      await infoUser.setPin(pin)
      await infoUser.changeMobile(personalPhoneId)
    } catch (error) {
      return next({ error, code: '24' })
    }
    return res.json({
      msg: 'Datos iniciales cambiados con éxito.'
    })
  } else {
    return next({ error: new Error(), code: '23' })
  }
}


const profile = async (req, res, _next) => {
  const { user } = req
  return res.json(user)
}

export {
  authenticate,
  changeInitialData,
  profile,
  register,
  verifyToken,
}