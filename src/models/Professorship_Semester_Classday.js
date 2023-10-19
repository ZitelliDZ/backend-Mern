import mongoose from 'mongoose'
import Professorship from './Professorship.js'
import Classday from './Classday.js'
import Semester from './Semester.js'

// Crea el esquema de Curso
const prosemesclassSchema = mongoose.Schema(
  {
    professorship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Professorship,
      required: true
    },
    classday: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Classday,
      required: false
    },
    semester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Semester,
      required: true
    }
  },
  {
    timestamps: true
  }
)

// Método personalizado de creación
prosemesclassSchema.statics.createProsemesclass = async function (professorship, classday, semester) {
  const ProfessorshipSemesterClassday = new this({
    professorship,
    classday,
    semester
  })
  return await ProfessorshipSemesterClassday.save()
}

prosemesclassSchema.methods.setClassday = async function (classday) {
  this.classday = classday._id
  return await this.save()
}
prosemesclassSchema.methods.getId = function () {
  return this._id
}
prosemesclassSchema.methods.getClassday = function () {
  return this.classday
}
prosemesclassSchema.methods.setProfessorship = async function (professorship) {
  this.professorship = professorship._id
  return await this.save()
}

prosemesclassSchema.methods.getProfessorship = function () {
  return this.professorship
}
prosemesclassSchema.methods.setSemester = async function (semester) {
  this.semester = semester._id
  return await this.save()
}

prosemesclassSchema.methods.getSemester = function () {
  return this.semester
}

const ProfessorshipSemesterClassday = mongoose.model('ProfessorshipSemesterClassday', prosemesclassSchema)
export default ProfessorshipSemesterClassday

// SUAGGER

/**
 *  @swagger
 *  components:
 *  schemas:
 *    ProfessorshipSemesterClassday:
 *      type: object
 *      properties:
 *        professorship:
 *          type: ObjectId
 *          required: true
 *          $ref: '#/components/schemas/Professorship'
 *        classday:
 *          type: ObjectId
 *          required: true
 *          $ref: '#/components/schemas/Classday'
 *        semester:
 *          type: ObjectId
 *          required: true
 *          $ref: '#/components/schemas/Semester'
 *        timestamps:
 *          type: Date
 *          descripción: modelo con los atributos "createdAt" y "updatedAt"
 *      required:
 *        - professorship
 *        - classday
 *        - semester
 *      example:
 *        professorship: ObjectId
 *        classday: ObjectId
 *        semester: ObjectId
 */
