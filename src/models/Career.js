import mongoose from 'mongoose'
import Department from './Department.js'

// Crea el esquema de Carrera
const careerSchema = mongoose.Schema(
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
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Department,
      required: true
    }
  },
  {
    timestamps: true
  }
)

careerSchema.statics.createCareer = async function (name, code, department) {
  const newCareer = new this({
    name,
    code,
    department
  })
  return await newCareer.save()
}
careerSchema.methods.setDepartment = async function (department) {
  this.department = department.getId()
  return await this.save()
}
careerSchema.methods.getDepartment = function () {
  return this.department
}

careerSchema.methods.setName = async function (name) {
  this.name = name
  return await this.save()
}

careerSchema.methods.getName = function () {
  return this.name
}
careerSchema.methods.getId = function () {
  return this._id
}

careerSchema.methods.setCode = async function (code) {
  this.code = code
  return await this.save()
}

careerSchema.methods.getCode = function () {
  return this.code
}
const Career = mongoose.model('Career', careerSchema)
export default Career

// SUAGGER

/**
 *  @swagger
 *  components:
 *  schemas:
 *    Career:
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
 *        department:
 *          type: ObjectId
 *          required: true
 *          $ref: '#/components/schemas/Department'
 *        timestamps:
 *          type: Date
 *          descripción: modelo con los atributos "createdAt" y "updatedAt"
 *      required:
 *        - name
 *      example:
 *        name: Ingeniería en Informática
 *        code: ING-INF
 *        department: ObjectId
 */
