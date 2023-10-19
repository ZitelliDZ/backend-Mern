import mongoose from 'mongoose'
import Classroom from './Classroom.js'

// Crea el esquema de Día de cursada
const classdaySchema = mongoose.Schema(
  {
    number: {
      type: Number,
      required: true
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Classroom,
      required: true
    },
    starthour: {
      type: Date,
      required: true
    },
    endhour: {
      type: Date,
      required: true
    },
    isactive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

classdaySchema.statics.createClassday = async function (number, classroom, isactive, starthour, endhour) {
  const newClassday = await new this({
    number,
    classroom,
    isactive,
    starthour,
    endhour
  })
  return await newClassday.save()
}

classdaySchema.methods.getStarthour = function () {
  return this.starthour
}
classdaySchema.methods.getEndhour = function () {
  return this.endhour
}
classdaySchema.methods.getId = function () {
  return this._id
}

classdaySchema.methods.setClassroom = async function (classroom) {
  this.classroom = classroom._id
  return await this.save()
}
classdaySchema.methods.getClassroom = function () {
  return this.classroom
}
classdaySchema.methods.setActive = async function (isactive) {
  this.isactive = isactive
  return await this.save()
}
classdaySchema.methods.getActive = function () {
  return this.isactive
}
classdaySchema.methods.setNumber = async function (number) {
  this.number = number
  return await this.save()
}
classdaySchema.methods.getId = function () {
  return this._id
}
classdaySchema.methods.getNumber = function () {
  return this.number
}
classdaySchema.methods.setProsemesclass = async function (prosemesclass) {
  this.prosemesclass = prosemesclass.id
  return await this.save()
}
classdaySchema.methods.getProsemesclass = function () {
  return this.prosemesclass
}

const Classday = mongoose.model('Classday', classdaySchema)
export default Classday

// SUAGGER

/**
 *  @swagger
 *  components:
 *  schemas:
 *    Classday:
 *      type: object
 *      properties:
 *        number:
 *          type: Number
 *          required: true
 *        classroom:
 *          type: ObjectId
 *          required: true
 *          $ref: '#/components/schemas/Classroom'
 *        isactive:
 *          type: Boolean
 *          default: true
 *        starthour:
 *          type: Date
 *          required: true
 *        endhour:
 *          type: Date
 *          required: true
 *        attendances:
 *          type: array
 *          required: false
 *          default: null
 *          items:
 *            $ref: '#/components/schemas/Attendance'
 *        attendancerecords:
 *          type: array
 *          required: false
 *          default: null
 *          items:
 *            $ref: '#/components/schemas/Record'
 *        timestamps:
 *          type: Date
 *          descripción: modelo con los atributos "createdAt" y "updatedAt"
 *      required:
 *        - number
 *        - classroom
 *        - isactive
 *        - starthour
 *        - endhour
 *      example:
 *        number: 1
 *        classroom:  ObjectId
 *        isactive: true
 *        attendances: [ ObjectId ]
 *        attendancerecords: [ ObjectId ]
 *        starthour: 14-08-2023 12:30:00
 *        endhour: 25-11-2023 14:00:00
 */
