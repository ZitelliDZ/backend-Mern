import mongoose from 'mongoose'
import Professorship from './Professorship.js'
import Semester from './Semester.js'
import User from './User.js'

// Crea el esquema de Curso
const prosemesuserSchema = mongoose.Schema(
  {
    professorship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Professorship,
      required: true
    },
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      default: null,
      ref: User
    }],
    professors: [{
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      default: null,
      ref: User
    }],
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
prosemesuserSchema.statics.createProsemesuser = async function (professorship, professors, students, semester) {
  const ProfessorshipSemesterUser = new this({
    professorship,
    professors,
    students,
    semester
  })
  return await ProfessorshipSemesterUser.save()
}

prosemesuserSchema.methods.addStudents = async function (student) {
  this.students.push(student)
  return await this.save()
}
prosemesuserSchema.methods.addProfessors = async function (professor) {
  this.professors.push(professor)
  return await this.save()
}
prosemesuserSchema.methods.setStudents = async function (students) {
  this.students = students
  return await this.save()
}
prosemesuserSchema.methods.getStudents = function () {
  return this.students
}
prosemesuserSchema.methods.setProfessors = async function (professors) {
  this.professors = professors
  return await this.save()
}
prosemesuserSchema.methods.getProfessors = function () {
  return this.professors
}
prosemesuserSchema.methods.getId = function () {
  return this._id
}
prosemesuserSchema.methods.setProfessorship = async function (professorship) {
  this.professorship = professorship._id
  return await this.save()
}

prosemesuserSchema.methods.getProfessorship = function () {
  return this.professorship
}
prosemesuserSchema.methods.setSemester = async function (semester) {
  this.semester = semester._id
  return await this.save()
}

prosemesuserSchema.methods.getSemester = function () {
  return this.semester
}
prosemesuserSchema.methods.setUser = async function (user) {
  this.user = user._id
  return await this.save()
}

prosemesuserSchema.methods.getUser = function () {
  return this.user
}

const ProfessorshipSemesterUser = mongoose.model('ProfessorshipSemesterUser', prosemesuserSchema)
export default ProfessorshipSemesterUser
