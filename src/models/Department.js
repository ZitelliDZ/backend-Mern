import mongoose from 'mongoose'

// Crea el esquema de Departamento
const departmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    code: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
)
departmentSchema.statics.createDepartment = async function (name, code) {
  const newDepartment = new this({
    name,
    code
  })
  return await newDepartment.save()
}
departmentSchema.methods.getId = function () {
  return this._id
}

departmentSchema.methods.setName = async function (name) {
  this.name = name
  return await this.save()
}

departmentSchema.methods.getName = function () {
  return this.name
}

departmentSchema.methods.setCode = async function (code) {
  this.code = code
  return await this.save()
}

departmentSchema.methods.getCode = function () {
  return this.code
}

const Department = mongoose.model('Department', departmentSchema)
export default Department

// SUAGGER

/**
 *  @swagger
 *  components:
 *  schemas:
 *    Department:
 *      type: object
 *      properties:
 *        name:
 *          type: String
 *          required: true
 *          trim: true
 *        code:
 *          type: String
 *          required: true
 *          trim: true
 *        timestamps:
 *          type: Date
 *          descripción: modelo con los atributos "createdAt" y "updatedAt"
 *      required:
 *        - name
 *        - code
 *      example:
 *        name: Departamento de Ingeniería
 *        code: ING
 */
