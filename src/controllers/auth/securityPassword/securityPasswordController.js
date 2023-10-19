import { passwordResetEmail } from "../../../helpers/generateEmail.js"
import Infouser from "../../../models/Infouser.js"
import User from "../../../models/User.js"

const newPassword = async (req, res, next) => {
  const { token } = req.params
  const { dni, password } = req.body

  const user = await User.findOne({ dni })
  if (!user) {
    return next({ error: new Error(), code: '4' })
  }

  const infoUser = await Infouser.findById(user.infouser)
  if (!infoUser) {
    return next({ error: new Error(), code: '6' })
  }

  if (!await infoUser.verifyRecoveryToken(token)) {
    return next({ error: new Error(), code: '7' })
  } else {
    try {
      // modificamos el password (que lo hashea antes de guardarlo) y elimina el token de 1 solo uso
      await user.changePassword(password)
      await infoUser.changePassword()
      res.json({
        msg: 'Contraseña modificada con éxito.'
      })
    } catch (error) {
      return next({ error, code: '8' })
    }
  }
}


const resetPassword = async (req, res, next) => {
  const { dni } = req.body
  const user = await User.findOne({ dni })

  // Comprobar si el usuario existe
  if (!user) {
    return next({ error: new Error(), code: '4' })
  }

  const infoUser = await Infouser.findById(user.infouser)
  if (!infoUser) {
    return next({ error: new Error(), code: '6' })
  }

  // Genera el token, guarda y lo envia por email
  try {
    const info = await infoUser.generateRecoverytoken()

    passwordResetEmail({
      dni: user.dni,
      email: user.email,
      name: user.name,
      token: info.token
    })
    res.json({
      msg: 'Se ha enviado un email para el cambio de contraseña.'
    })
  } catch (error) {
    return next({ error, code: '5' })
  }
}

export {
  resetPassword,
  newPassword
}