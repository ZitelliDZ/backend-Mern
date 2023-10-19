import Classroom from "../../models/Classroom.js"
import Department from "../../models/Department.js"

const getClassrooms = async (req, res, next) => {
  const { id } = req.params
  const department = await Department.findById(id).select('name')
  if (!department) {
    return next({ error: new Error(), code: '37' })
  }
  try {
    const classrooms = await Classroom.find({ department: id }).select('name latitude longitude altitude radius')
    return res.json(classrooms)
  } catch (error) {
    return next({ error, code: '36' })
  }
}

export {
  getClassrooms
}