import mongoose from 'mongoose'
import User from './User.js'
import Classday from './Classday.js'

// Crea el esquema de registro para la toma de asistencia
const recordSchema = mongoose.Schema(
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
    localized: {
      type: Boolean,
      required: true,
      default: false
    },
    timerecord: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
)

// Método personalizado de creación
recordSchema.statics.createRecord = async function (user, classday, localized) {
  const newRecord = new this({
    user,
    classday,
    timerecord: new Date(),
    localized
  })
  return await newRecord.save()
}
recordSchema.methods.setLocalized = async function (localized) {
  this.localized = localized
  return await this.save()
}

recordSchema.methods.getTimeRecord = function () {
  return this.timerecord
}
recordSchema.methods.setTimeRecord = async function (timerecord) {
  this.timerecord = timerecord
  return await this.save()
}
recordSchema.methods.getCreatedAt = function () {
  return this.createdAt
}
recordSchema.methods.setCreatedAt = async function (createdAt) {
  this.createdAt = createdAt
  return await this.save()
}
recordSchema.methods.getUser = function () {
  return this.user
}
recordSchema.methods.setUser = async function (user) {
  this.user = user
  return await this.save()
}

recordSchema.methods.getLocalized = function () {
  return this.localized
}
const Record = mongoose.model('Record', recordSchema)
export default Record

// SUAGGER

/**
 *  @swagger
 *  components:
 *  schemas:
 *    Record:
 *      type: object
 *      properties:
 *        user:
 *          type: ObjectId
 *          required: true
 *          $ref: '#/components/schemas/User'
 *        localized:
 *          type: Boolean
 *          required: true
 *          default: false
 *        timestamps:
 *          type: Date
 *          descripción: modelo con los atributos "createdAt" y "updatedAt"
 *      required:
 *        - user
 *        - localized
 *      example:
 *        user: ObjectId
 *        localized: true
 */
