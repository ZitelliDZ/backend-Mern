import { mobileResetEmail } from "../../../helpers/generateEmail.js"
import Infouser from "../../../models/Infouser.js"
import User from "../../../models/User.js"

const resetMobileId = async (req, res, next) => {
  // comprobar que el dni de un usuario exista
  const { dni } = req.user
  const user = await User.findOne({ dni })

  if (!user) {
    return next({ error: new Error(), code: '4' })
  }

  const infoUser = await Infouser.findById(user.infouser)
  if (!infoUser) {
    return next({ error: new Error(), code: '6' })
  }

  // genera el token, guarda y lo envia por email
  try {
    const info = await infoUser.generateRecoverytokenmobile()

    mobileResetEmail({
      dni: user.dni,
      email: user.email,
      name: user.name,
      token: info.token
    })
    res.json({
      msg: 'Se ha enviado un email para el cambio de su dispositivo.'
    })
  } catch (error) {
    return next({ error, code: '9' })
  }
}
const includeMobileId = async (req, res, next) => {
  const { token } = req.params
  const { dni } = req.user
  const { personalPhoneId } = req.body

  const user = await User.findOne({ dni })
  if (!user) {
    return next({ error: new Error(), code: '4' })
  }

  const infoUser = await Infouser.findById(user.infouser)
  if (!infoUser) {
    return next({ error: new Error(), code: '6' })
  }

  if (!await infoUser.verifyRecoveryTokenMobile(token)) {
    return next({ error: new Error(), code: '7' })
  } else {
    const infos = await Infouser.find().select(
      'personalPhoneId'
    )
    let found = false
    for (const element of infos) {
      if (element.personalPhoneId && await element.verifyMobile(personalPhoneId)) {
        found = true
        break
      }
    }

    if (found) {
      return next({ error: new Error(), code: '15' })
    }

    try {
      await infoUser.changeMobile(personalPhoneId)
      res.json({
        msg: 'El dispositivo mobile ha sido cambiado con éxito.'
      })
    } catch (error) {
      return next({ error, code: '16' })
    }
  }
}

export {
  includeMobileId,
  resetMobileId
}