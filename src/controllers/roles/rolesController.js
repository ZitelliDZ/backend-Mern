import Rol from "../../models/Rol.js"


const getRoles = async (req, res, next) => {
  try {
    const roles = await Rol.find().select('name')
    return res.json({ roles })
  } catch (error) {
    return next({ error, code: '34' })
  }
}

export {
  getRoles
}