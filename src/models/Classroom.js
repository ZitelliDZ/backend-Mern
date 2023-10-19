import mongoose from 'mongoose'
import Department from './Department.js'

// Crea el esquema del Aula
const classroomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Department,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    altitude: {
      type: Number,
      required: true
    },
    radius: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

// Método personalizado de creación
classroomSchema.statics.createClassroom = async function (name, department, latitude, longitude, altitude, radius) {
  const newClassroom = new this({
    name,
    department,
    longitude,
    latitude,
    altitude,
    radius
  })
  return await newClassroom.save()
}
classroomSchema.methods.setName = async function (name) {
  this.name = name
  return await this.save()
}

classroomSchema.methods.getName = function () {
  return this.name
}
classroomSchema.methods.getId = function () {
  return this._id
}
const Classroom = mongoose.model('Classroom', classroomSchema)
export default Classroom

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
