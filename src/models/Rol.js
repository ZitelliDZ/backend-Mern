import mongoose from 'mongoose'
import Permission from './Permission.js'

// Crea el esquema de Rol
const rolSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    permissions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: Permission,
      required: false
    }]
  },
  {
    timestamps: true
  }
)
rolSchema.statics.createRol = async function (name, permissions) {
  const newRol = new this({
    name,
    permissions
  })
  return await newRol.save()
}
rolSchema.methods.getId = function () {
  return this._id
}
rolSchema.methods.addPermission = async function (rol) {
  this.permissions.push(rol)
  return await this.save()
}

const Rol = mongoose.model('Rol', rolSchema)
export default Rol

// SUAGGER

/**
 *  @swagger
 *  components:
 *  schemas:
 *    Rol:
 *      type: object
 *      properties:
 *        name:
 *          type: String
 *          required: true
 *          trim: true
 *          unique: true
 *        permissions:
 *          type: array
 *          required: false
 *          items:
 *            $ref: '#/components/schemas/Permission'
 *        timestamps:
 *          type: Date
 *          descripción: modelo con los atributos "createdAt" y "updatedAt"
 *      required:
 *        - name
 *      example:
 *        name: Estudiante
 *        permissions: [ ObjectId ]
 */
