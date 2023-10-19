import Infouser from '../../models/Infouser.js'

const checkPin = async (req, _res, next) => {
  const { pin } = req.body
  try {
    const validateToken = await Infouser.findById(req.user.user.getInfouser())

    if (!await validateToken.getPin()) {
      return next({ error: new Error(), code: '47' })
    }
    if (!await validateToken.verifyPin(pin)) {
      return next({ error: new Error(), code: '46' })
    }

    return next()
  } catch (error) {
    return next({ error, code: '20' })
  }
}

export default checkPin
