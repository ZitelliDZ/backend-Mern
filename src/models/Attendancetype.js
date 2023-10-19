import mongoose from 'mongoose'

const attendancetypeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    plural: {
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
attendancetypeSchema.statics.createAttendancetype = async function (plural, name) {
  const newAttendancetype = new this({
    name,
    plural
  })
  return await newAttendancetype.save()
}
attendancetypeSchema.methods.setName = async function (name) {
  this.name = name
  return await this.save()
}

attendancetypeSchema.methods.getName = function () {
  return this.name
}
attendancetypeSchema.methods.setPlural = async function (plural) {
  this.plural = plural
  return await this.save()
}

attendancetypeSchema.methods.getPlural = function () {
  return this.plural
}
attendancetypeSchema.methods.getId = function () {
  return this._id
}
const Attendancetype = mongoose.model('Attendancetype', attendancetypeSchema)
export default Attendancetype

// SUAGGER

/**
 *  @swagger
 *  components:
 *  schemas:
 *    Classroom:
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
 *        name: Aula Magna
 */
