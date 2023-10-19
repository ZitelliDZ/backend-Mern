import { pinResetEmail } from "../../../helpers/generateEmail.js"
import Infouser from "../../../models/Infouser.js"
import User from "../../../models/User.js"

const verifyPin = async (req, res, next) => {
  const { pin } = req.params
  try {
    const validateToken = await Infouser.findById(req.user.user.getInfouser())

    if (!await validateToken.getPin()) {
      return next({ error: new Error(), code: '47' })
    }
    if (!await validateToken.verifyPin(pin)) {
      return next({ error: new Error(), code: '46' })
    }

    return res.json({
      msg: 'Pin correcto.'
    })
  } catch (error) {
    return next({ error, code: '48' })
  }
}


const newPin = async (req, res, next) => {
  const { token } = req.params
  const { pin } = req.body

  const user = await User.findById(req.user._id)
  if (!user) {
    return next({ error: new Error(), code: '4' })
  }

  const infoUser = await Infouser.findById(user.infouser)
  if (!infoUser) {
    return next({ error: new Error(), code: '6' })
  }

  if (!await infoUser.verifyRecoveryTokenPin(token)) {
    return next({ error: new Error(), code: '7' })
  } else {
    try {
      await infoUser.setPin(pin)
      return res.json({
        msg: 'El pin ha sido cambiado con éxito.'
      })
    } catch (error) {
      return next({ error, code: '24' })
    }
  }
}



const resetPin = async (req, res, next) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    return next({ error: new Error(), code: '4' })
  }

  const infoUser = await Infouser.findById(user.infouser)
  if (!infoUser) {
    return next({ error: new Error(), code: '6' })
  }

  // genera el token, guarda y lo envia por email
  try {
    const info = await infoUser.generateRecoverytokenpin()

    pinResetEmail({
      dni: user.dni,
      email: user.email,
      name: user.name,
      token: info.token
    })
    res.json({
      msg: 'Se ha enviado un email para el cambio de su pin de seguridad.'
    })
  } catch (error) {
    return next({ error, code: '25' })
  }
}


export {
  resetPin,
  newPin,
  verifyPin
}