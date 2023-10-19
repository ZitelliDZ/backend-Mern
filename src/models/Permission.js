import mongoose from 'mongoose'

// Crea el esquema de Permisos
const permissionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
)

// Método personalizado de creación
permissionSchema.statics.createPermission = async function (name) {
  const newPermission = new this({
    name
  })
  return await newPermission.save()
}

const Permission = mongoose.model('Permission', permissionSchema)
export default Permission

// SUAGGER

/**
 *  @swagger
 *  components:
 *  schemas:
 *    Permission:
 *      type: object
 *      properties:
 *        name:
 *          type: String
 *          required: true
 *          trim: true
 *          unique: true
 *        timestamps:
 *          type: Date
 *          descripción: modelo con los atributos "createdAt" y "updatedAt"
 *      required:
 *        - name
 *      example:
 *        name: user-create
 */
