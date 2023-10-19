import Attendance from "../../models/Attendance.js"
import Attendancetype from "../../models/Attendancetype.js"
import Classday from "../../models/Classday.js"
import Professorship from "../../models/Professorship.js"
import ProfessorshipSemesterClassday from "../../models/Professorship_Semester_Classday.js"
import ProfessorshipSemesterUser from "../../models/Professorship_Semester_User.js"
import Semester from "../../models/Semester.js"
import User from "../../models/User.js"

const getProfessorship = async (req, res, next) => {
  const { id } = req.params
  const professorship = await Professorship.findById(id).populate({
    path: 'career',
    select: '_id name code',
    populate: { path: 'department', select: '_id name code' }
  }).select('-createdAt -updatedAt -__v')

  if (!professorship) {
    return next({ error: new Error(), code: '26' })
  }
  try {
    const idDemesters = await ProfessorshipSemesterClassday.find({ professorship: id }).distinct('semester').exec()
    const semesters = await Semester.find({ _id: { $in: idDemesters } }).select('-createdAt -updatedAt -__v')

    return res.json({ professorship, semesters })
  } catch (error) {
    return next({ error, code: '38' })
  }
}


const getInfoProfessorshipStudents = async (req, res, next) => {
  let { user } = req
  const { professorship, semester } = req.params

  const sem = await Semester.findById(semester)
  if (!sem) {
    return next({ error: new Error(), code: '40' })
  }

  const prof = await Professorship.findById(professorship)
  if (!prof) {
    return next({ error: new Error(), code: '41' })
  }

  const professorshipInfo = await ProfessorshipSemesterUser.find({ professorship, semester }).populate({
    path: 'professors',
    select: 'name email _id'
  }).populate({
    path: 'students',
    select: 'name email _id'
  }).populate({
    path: 'professorship',
    select: 'name code _id',
    populate: {
      path: 'career',
      select: '_id name code',
      populate: { path: 'department', select: '_id name code' }
    }
  }).populate({
    path: 'semester',
    select: '-createdAt -updatedAt -__v'
  }).select('-createdAt -updatedAt -__v ')

  if (!professorshipInfo) {
    return next({ error: new Error(), code: '42' })
  }

  const idProSemClas = await ProfessorshipSemesterClassday.find({ professorship, semester }, { _id: 0, classday: 1 })

  const idClassdays = idProSemClas.map(element => (element.classday))

  const classdays = await Classday.find({ _id: { $in: idClassdays } }).populate({
    path: 'classroom',
    select: 'name latitude longitude altitude radius'
  }).select('-createdAt -updatedAt -__v ')

  user = await User.findById(user._id).select('-password -infouser -roles -isDeleted -createdAt -updatedAt -__v')

  const attendance = await Attendance.find({ user: user.getId(), classday: { $in: idClassdays } }).populate({
    path: 'attendancetype'
  })
  const attendanceType = await Attendancetype.find()

  const countByType = {}
  attendanceType.forEach(function (attendee) {
    countByType[attendee.getPlural()] = 0
  })

  attendance.forEach(function (attendee) {
    const type = attendee.attendancetype.getPlural()
    countByType[type]++
  })

  return res.json({ professorshipInfo, classdays, countAttendance: countByType })
}
const getInfoProfessorship = async (req, res, next) => {
  const { professorship, semester } = req.params
  try {
    const professorshipInfo = await ProfessorshipSemesterUser.find({ professorship, semester }).populate({
      path: 'professors',
      select: 'name email _id'
    }).populate({
      path: 'students',
      select: 'name email _id'
    }).populate({
      path: 'professorship',
      select: 'name code _id',
      populate: {
        path: 'career',
        select: '_id name code',
        populate: { path: 'department', select: '_id name code' }
      }
    }).populate({
      path: 'semester',
      select: '-createdAt -updatedAt -__v'
    }).select('-createdAt -updatedAt -__v ')

    const idProSemClas = await ProfessorshipSemesterClassday.find({ professorship, semester }, { _id: 0, classday: 1 })

    const idClassdays = idProSemClas.map(element => (element.classday))

    const classdays = await Classday.find({ _id: { $in: idClassdays } }).populate({
      path: 'classroom',
      select: 'name latitude longitude altitude radius'
    }).select('-createdAt -updatedAt -__v ')

    const countByStudent = []
    const attendanceType = await Attendancetype.find()

    for (const element of professorshipInfo[0].students) {
      const attendance = await Attendance.find({ user: element.getId(), classday: { $in: idClassdays } }).populate({
        path: 'attendancetype'
      })

      const countByType = {}
      attendanceType.forEach(function (attendee) {
        countByType[attendee.getPlural()] = 0
      })

      attendance.forEach(function (attendee) {
        const type = attendee.attendancetype.getPlural()
        countByType[type]++
      })

      countByStudent.push({ student: element, countByType })
    }

    return res.json({ professorshipInfo, classdays, countByStudent })
  } catch (error) {
    return next({ error, code: '38' })
  }
}

export {
  getInfoProfessorship,
  getInfoProfessorshipStudents,
  getProfessorship

}