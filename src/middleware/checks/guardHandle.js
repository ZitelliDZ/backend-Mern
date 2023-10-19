import User from '../../models/User.js'

const guard = (rolesAndPermissions) => {
  return async (req, _res, next) => {
    try {
      // Aquí realizas la lógica de verificación de roles
      const user = await User.findById(req.user._id)
        .populate({
          path: 'roles',
          select: ' -createdAt -updatedAt -__v',
          populate: {
            path: 'permissions',
            select: ' -createdAt -updatedAt -__v'
          }
        }).select('-__id -password -isDeleted -infouser -email -dni -name -createdAt -updatedAt -__v')

      const checkPermissions = (user, rolesAndPermissions) => {
        for (const element of rolesAndPermissions) {
          const foundRole = user.roles.some((object) => {
            return object.name === element
          })

          if (!foundRole) {
            const foundPermission = user.roles.some((object) => {
              return object.permissions.some((permission) => {
                return permission.name === element
              })
            })

            if (foundPermission) {
              return true
            }
          } else {
            return true
          }
        }

        return false
      }

      const found = checkPermissions(user, rolesAndPermissions)

      if (found) {
        // Si el usuario tiene permiso, pasa al siguiente middleware o controlador
        next()
      } else {
        // Si el usuario no tiene permiso, devuelve una respuesta de error
        return next({ error: new Error(), code: '19' })
      }
    } catch (error) {
      // Manejo de errores si ocurre alguna excepción durante la verificación de roles
      return next({ error, code: '20' })
    }
  }
}

export default guard
