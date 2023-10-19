
import ProfessorshipSemesterUser from '../../models/Professorship_Semester_User.js'
import Semester from '../../models/Semester.js'
import User from '../../models/User.js'

const getProfessorships = async (req, res, next) => {
  try {
    const semesters = await Semester.find({ isactive: true })

    const professorshipSemesterUser = await ProfessorshipSemesterUser.find({ semester: semesters }).populate({
      path: 'professorship',
      select: '-updatedAt -__v -createdAt',
      populate: {
        path: 'career',
        select: '_id name code',
        populate: { path: 'department', select: '_id name code' }
      }
    }).populate({
      path: 'semester', select: '-createdAt -updatedAt -__v'
    }).populate({
      path: 'professors', select: 'dni name _id'
    }).select('-students -updatedAt -__v')

    return res.json({ professorships: professorshipSemesterUser })
  } catch (error) {
    return next({ error, code: '22' })
  }
}

const getProfessorshipsStudents = async (req, res, next) => {
  let { user } = req

  try {
    user = await User.findById(user._id).select('-password -infouser -roles -isDeleted -createdAt -updatedAt -__v')

    const semesters = await Semester.find({ isactive: true })

    const professorshipSemesterUser = await ProfessorshipSemesterUser.find({ semester: semesters, students: { $in: user.getId() } }).populate({
      path: 'professorship',
      select: '-updatedAt -__v -createdAt',
      populate: {
        path: 'career',
        select: '_id name code',
        populate: { path: 'department', select: '_id name code' }
      }
    }).populate({
      path: 'semester', select: '-createdAt -updatedAt -__v'
    }).populate({
      path: 'professors', select: 'dni name _id'
    }).select('-students -updatedAt -__v')

    return res.json({ professorships: professorshipSemesterUser })
  } catch (error) {
    return next({ error, code: '22' })
  }
}

const getProfessorshipsProfessors = async (req, res, next) => {
  let { user } = req
  try {
    user = await User.findById(user._id).select('-password -infouser -roles -isDeleted -createdAt -updatedAt -__v')

    const semesters = await Semester.find({ isactive: true })

    const professorshipSemesterUser = await ProfessorshipSemesterUser.find({ semester: semesters, professors: { $in: user.getId() } }).populate({
      path: 'professorship',
      select: '-updatedAt -__v -createdAt',
      populate: {
        path: 'career',
        select: '_id name code',
        populate: { path: 'department', select: '_id name code' }
      }
    }).populate({
      path: 'semester', select: '-createdAt -updatedAt -__v'
    }).populate({
      path: 'professors', select: 'dni name _id'
    }).select('-students -updatedAt -__v')

    return res.json({ professorships: professorshipSemesterUser })
  } catch (error) {
    return next({ error, code: '22' })
  }
}

const profile = async (req, res, _next) => {
  const { user } = req
  return res.json(user)
}

export {
  profile,
  getProfessorships,
  getProfessorshipsStudents,
  getProfessorshipsProfessors
}
