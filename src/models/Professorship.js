import mongoose from 'mongoose'
import Career from './Career.js'

// Crea el esquema de Cátedra
const professorshipSchema = mongoose.Schema(
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
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Career,
      required: true
    }
  },
  {
    timestamps: true
  }
)

professorshipSchema.statics.createProfessorship = async function (name, code, career) {
  const newProfessorship = new Professorship({
    name,
    code,
    career
  })
  return await newProfessorship.save()
}
professorshipSchema.methods.getId = function () {
  return this._id
}

professorshipSchema.methods.setCareer = async function (career) {
  this.career = career._id
  return await this.save()
}
professorshipSchema.methods.getCareer = function () {
  return this.career
}
professorshipSchema.methods.setName = async function (name) {
  this.name = name
  return await this.save()
}

professorshipSchema.methods.getName = function () {
  return this.name
}

professorshipSchema.methods.setCode = async function (code) {
  this.code = code
  return await this.save()
}

professorshipSchema.methods.getCode = function () {
  return this.code
}

const Professorship = mongoose.model('Professorship', professorshipSchema)
export default Professorship

// SUAGGER

/**
 *  @swagger
 *  components:
 *  schemas:
 *    Professorship:
 *      type: object
 *      properties:
 *        name:
 *          type: String
 *          required: true
 *          trim: true
 *          unique: true
 *        code:
 *          type: String
 *          required: true
 *          trim: true
 *          unique: true
 *        career:
 *          type: ObjectId
 *          required: true
 *          $ref: '#/components/schemas/Career'
 *        students:
 *          type: array
 *          required: false
 *          default: null
 *          items:
 *            $ref: '#/components/schemas/User'
 *        professors:
 *          type: array
 *          required: false
 *          default: null
 *          items:
 *            $ref: '#/components/schemas/User'
 *        timestamps:
 *          type: Date
 *          descripción: modelo con los atributos "createdAt" y "updatedAt"
 *      required:
 *        - name
 *        - code
 *      example:
 *        name: Inteligencia Artificial I
 *        code: ING-INF-IA1
 *        career: ObjectId
 *        students: [ ObjectId ]
 *        professors: [ ObjectId ]
 */
