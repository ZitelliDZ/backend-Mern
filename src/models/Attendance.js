import mongoose from 'mongoose'
import User from './User.js'
import Classday from './Classday.js'
import Attendancetype from './Attendancetype.js'
import Rol from './Rol.js'

// Crea el esquema de Asistencia
const attendanceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true
    },
    classday: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Classday,
      required: true
    },
    rol: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Rol,
      required: true
    },
    attended: {
      type: Boolean,
      default: false
    },
    attendancetype: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Attendancetype,
      required: true
    }
  },
  {
    timestamps: false
  }
)

// Método personalizado de creación
attendanceSchema.statics.createAttendance = async function (user, classday, rol, attended, attendancetype) {
  const newattendance = new this({
    user,
    classday,
    rol,
    attended,
    attendancetype
  })
  return await newattendance.save()
}
attendanceSchema.methods.setAttended = async function (attended) {
  this.attended = attended
  return await this.save()
}

attendanceSchema.methods.getId = function () {
  return this._id
}
attendanceSchema.methods.getUser = function () {
  return this.user
}
attendanceSchema.methods.setUser = async function (user) {
  this.user = user
  return await this.save()
}

attendanceSchema.methods.getAttended = function () {
  return this.attended
}
const Attendance = mongoose.model('Attendance', attendanceSchema)
export default Attendance

// SUAGGER

/**
 *  @swagger
 *  components:
 *  schemas:
 *    Attendance:
 *      type: object
 *      properties:
 *        user:
 *          type: ObjectId
 *          required: true
 *          $ref: '#/components/schemas/User'
 *        attended:
 *          type: Boolean
 *          required: true
 *          default: false
 *      required:
 *        - user
 *        - attended
 *      example:
 *        user: ObjectId
 *        attended: true
 */
