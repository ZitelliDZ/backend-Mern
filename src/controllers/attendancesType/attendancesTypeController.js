import Attendancetype from "../../models/Attendancetype.js"

const getAttendancestype = async (req, res, next) => {
  try {
    const attendancestype = await Attendancetype.find().select('name')
    return res.json({ attendancesType: attendancestype })
  } catch (error) {
    return next({ error, code: '35' })
  }
}

export {
  getAttendancestype
}