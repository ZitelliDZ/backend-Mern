import mongoose from 'mongoose'

// Crea el esquema Semestre
const semesterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    startdate: {
      type: Date,
      required: true
    },
    enddate: {
      type: Date,
      required: true
    },
    code: {
      type: String,
      required: true,
      trim: true
    },
    isactive: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)
semesterSchema.statics.createSemester = async function (name, code, startdate, enddate, isactive) {
  const newSemester = new this({
    name,
    startdate,
    enddate,
    isactive,
    code
  })
  return await newSemester.save()
}

semesterSchema.methods.setName = async function (name) {
  this.name = name
  return await this.save()
}

semesterSchema.methods.getName = function () {
  return this.name
}

semesterSchema.methods.setCode = async function (code) {
  this.code = code
  return await this.save()
}

semesterSchema.methods.getCode = function () {
  return this.code
}
semesterSchema.methods.getId = function () {
  return this._id
}

semesterSchema.methods.setStartDate = async function (startdate) {
  this.startdate = startdate
  return await this.save()
}

semesterSchema.methods.getStartDate = function () {
  return this.startdate
}

semesterSchema.methods.setEndDate = async function (enddate) {
  this.enddate = enddate
  return await this.save()
}

semesterSchema.methods.getEndDate = function () {
  return this.enddate
}
semesterSchema.methods.setIsActive = async function (isactive) {
  this.isactive = isactive
  return await this.save()
}

semesterSchema.methods.getIsActive = function () {
  return this.isactive
}

const Semester = mongoose.model('Semester', semesterSchema)
export default Semester

// SUAGGER

/**
 *  @swagger
 *  components:
 *  schemas:
 *    Semester:
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
 *        isactive:
 *          type: Boolean
 *          default: false
 *        startdate:
 *          type: Date
 *          required: true
 *        enddate:
 *          type: Date
 *          required: true
 *        timestamps:
 *          type: Date
 *          descripción: modelo con los atributos "createdAt" y "updatedAt"
 *      required:
 *        - name
 *        - code
 *        - isactive
 *        - startdate
 *        - enddate
 *      example:
 *        name: Semestre 2-2023
 *        code: Sem-2-2023
 *        isactive: true
 *        startdate: 14-08-2023
 *        enddate: 25-11-2023
 */
