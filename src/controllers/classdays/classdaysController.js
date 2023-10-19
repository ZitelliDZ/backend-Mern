import Attendance from "../../models/Attendance.js"
import Attendancetype from "../../models/Attendancetype.js"
import Classday from "../../models/Classday.js"
import ProfessorshipSemesterClassday from "../../models/Professorship_Semester_Classday.js"
import ProfessorshipSemesterUser from "../../models/Professorship_Semester_User.js"
import Record from "../../models/Record.js"
import Rol from "../../models/Rol.js"
import User from "../../models/User.js"


const getClassdays = async (req, res, next) => {
  try {
    const { professorship, id } = req.params

    const idProSemClas = await ProfessorshipSemesterClassday.find({ professorship, semester: id }, { _id: 0, classday: 1 })

    const idClassdays = idProSemClas.map(element => (element.classday))

    const classdays = await Classday.find({ _id: { $in: idClassdays } }).populate({
      path: 'classroom',
      select: 'name'
    }).select('-createdAt -updatedAt -__v ')

    return res.json({ classdays })
  } catch (error) {
    return next({ error, code: '39' })
  }
}

const presentStudentList = async (req, res, next) => {
  const { id } = req.params

  const classday = await Classday.findById(id)

  if (!classday) {
    return next({ error: new Error(), code: '27' })
  }

  try {
    const records = await Record.aggregate([
      {
        $match: { classday: classday.getId() } // Filtrar por el ID del classday específico
      },
      {
        $sort: { timerecord: -1 } // Ordenar los registros por timerecord en orden descendente (el más reciente primero)
      },
      {
        $group: {
          _id: '$user',
          latestRecord: { $first: '$$ROOT' } // Seleccionar el primer registro de cada usuario (el más reciente)
        }
      },
      {
        $lookup: {
          from: 'users', // Nombre de la colección de usuarios
          localField: '_id',
          foreignField: '_id',
          as: 'user' // Alias para los datos del usuario
        }
      },
      {
        $unwind: '$user' // Deshacer el resultado del lookup para obtener un solo documento por usuario
      },
      {
        $project: {
          'latestRecord.localized': 1, // Incluir el campo 'timerecord' del último registro
          'user.name': 1, // Incluir el campo 'name' del usuario
          'user._id': 1 // Incluir el campo 'email' del usuario
        }
      },
      {
        $sort: { 'user.name': 1 } // Ordenar por el campo 'name' del usuario en orden ascendente (A-Z)
      }
    ]).exec()

    return res.json({ records })
  } catch (error) {
    return next({ error, code: '45' })
  }
}
const attendanceRecord = async (req, res, next) => {
  const user = await User.findById(req.user._id)
  const { id } = req.params
  const { localized } = req.body

  const classday = await Classday.findById(id)

  if (!classday) {
    return next({ error: new Error(), code: '27' })
  }

  const hourAccurrentTime = new Date()
  if (hourAccurrentTime < classday.getStarthour() || hourAccurrentTime > classday.getEndhour()) {
    return next({ error: new Error(), code: '43' })
  }

  let total = await Record.aggregate([
    {
      $match: { classday: classday.getId() } // Filtrar por el ID del classday específico
    },
    {
      $group: {
        _id: '$user'
      }
    }
  ])

  try {
    await Record.createRecord(user, classday, localized)

    total = await Record.aggregate([
      {
        $match: { classday: classday.getId() } // Filtrar por el ID del classday específico
      },
      {
        $group: {
          _id: '$user'
        }
      }
    ])


    return res.json({ msg: 'Registro guardado con éxito.' })
  } catch (error) {
    return next({ error, code: '44' })
  }
}
const attendanceList = async (req, res, next) => {
  const { id } = req.params

  const classday = await Classday.findById(id)

  if (!classday) {
    return next({ error: new Error(), code: '27' })
  }
  try {
    const attendanceList = await Attendance.find({ classday: id }).populate({
      path: 'user',
      select: 'name dni email '
    }).populate({
      path: 'attendancetype',
      select: 'name'
    }).populate({
      path: 'rol',
      select: 'name'
    }).select('-classday -__v ').lean()

    attendanceList.sort((a, b) => {
      const nameA = a.user.name.toUpperCase()
      const nameB = b.user.name.toUpperCase()

      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })

    return res.json(attendanceList)
  } catch (error) {
    return next({ error, code: '30' })
  }
}

const addAttendance = async (req, res, next) => {
  const { id } = req.params
  const { user, rol, attendanceType } = req.body

  const classday = await Classday.findById(id)
  if (!classday) {
    return next({ error: new Error(), code: '27' })
  }
  if (classday.getActive()) {
    return next({ error: new Error(), code: '31' })
  }
  const userAttendance = await User.findById(user)
  if (!userAttendance) {
    return next({ error: new Error(), code: '4' })
  }
  const rolAttendance = await Rol.findById(rol)
  if (!rolAttendance) {
    return next({ error: new Error(), code: '32' })
  }
  const attendanceTypeAdd = await Attendancetype.findById(attendanceType)
  if (!attendanceTypeAdd) {
    return next({ error: new Error(), code: '33' })
  }

  try {
    await Attendance.findOneAndRemove({ classday, user })
    await Attendance.createAttendance(userAttendance, classday, rolAttendance, true, attendanceTypeAdd)
    return res.json({
      msg: 'Éxito al agregar la asistencia.'
    })
  } catch (error) {
    return next({ error, code: '30' })
  }
}

const finishClassday = async (req, res, next) => {
  const { id } = req.params

  const classday = await Classday.findById(id)

  if (!classday) {
    return next({ error: new Error(), code: '27' })
  }

  if (!classday.getActive()) {
    return next({ error: new Error(), code: '28' })
  }

  const completeAssistance = await Attendancetype.findOne({ plural: 'Asistencias completas' })
  const partialAssistance = await Attendancetype.findOne({ plural: 'Asistencias parciales' })
  const halfAssistance = await Attendancetype.findOne({ plural: 'Medias Faltas' })
  const unexcusedAbsences = await Attendancetype.findOne({ plural: 'Faltas justificadas' })
  const rol = await Rol.findOne({ name: 'Estudiante' })

  const idProSemClas = await ProfessorshipSemesterClassday.findOne({ classday: id })
  const profSemUsers = await ProfessorshipSemesterUser.findOne({ professorship: idProSemClas.getProfessorship(), semester: idProSemClas.getSemester() })

  const classTime = classday.getEndhour() - classday.getStarthour()

  const attendanceAcceptanceRate = Number(process.env.ATTENDANCE_ACCEPTANCE_RATE)
  const partialAcceptanceRate = Number(process.env.ATTENDANCE_ACCEPTANCE_PARTIAL_RATE)
  const halfAcceptanceRate = Number(process.env.ATTENDANCE_ACCEPTANCE_HALF_RATE)

  try {
    if (process.env.ATTENDANCE_CONFIG === 'true') {
      await Promise.all(profSemUsers.students.map(async (student) => {
        const time = await _elapsedTime(id, student)
        const rate = time * 100 / classTime

        switch (rate) {
          case rate < 0:
            await Attendance.createAttendance(student, classday, rol, true, unexcusedAbsences)
            break
          case rate >= attendanceAcceptanceRate:
            await Attendance.createAttendance(student, classday, rol, true, completeAssistance)
            break
          case rate >= partialAcceptanceRate:
            await Attendance.createAttendance(student, classday, rol, true, partialAssistance)
            break
          case rate >= halfAcceptanceRate:
            await Attendance.createAttendance(student, classday, rol, true, halfAssistance)
            break
          default:
            await Attendance.createAttendance(student, classday, rol, true, unexcusedAbsences)
            break
        }
      }))
    } else {
      await Promise.all(profSemUsers.students.map(async (student) => {
        const flag = await _timeCompleted(id, student, classday.getStarthour())
        switch (flag) {
          case 0:
            await Attendance.createAttendance(student, classday, rol, true, halfAssistance)
            break
          case 1:
            await Attendance.createAttendance(student, classday, rol, true, completeAssistance)
            break
          case -1:
            await Attendance.createAttendance(student, classday, rol, true, unexcusedAbsences)
            break
          default:
            await Attendance.createAttendance(student, classday, rol, true, unexcusedAbsences)
            break
        }
      }))
    }

    await classday.setActive(false)
    return res.json({
      msg: 'Se ha generado exitosamente las asistencias.'
    })
  } catch (error) {
    return next({ error, code: '29' })
  }
}

const _timeCompleted = async (idClassday, student, startHour) => {
  const defaultMinutes = Number(process.env.ATTENDANCE_ACCEPTANCE_DEFAULT)
  const millisecondsPerMinute = 1000 * 60

  const recordss = await Record.find({ user: student._id, classday: idClassday }).sort({ createdAt: 1 }).exec()

  if (recordss !== null && recordss.length > 0) {
    let time = recordss[0].getTimeRecord()
    let auxTime = recordss[0].getTimeRecord() - recordss[0].getTimeRecord()
    let initial = true
    let out = false

    const endTime = new Date(startHour)
    endTime.setMinutes(endTime.getMinutes() + 15)
    if (time < startHour || time > endTime) {
      return -1
    }

    for (let index = 0; index < recordss.length; index++) {
      if (recordss[index].getLocalized()) {
        if (initial) {
          initial = false
          time = recordss[index].getTimeRecord()
        } else {
          if (!out) {
            auxTime = auxTime + (recordss[index].getTimeRecord() - time)
            time = recordss[index].getTimeRecord()
          } else {
            time = recordss[index].getTimeRecord()
          }
        }
      } else {
        if (initial) {
          initial = false
          auxTime = recordss[index].getTimeRecord() - time
          time = recordss[index].getTimeRecord()
        } else {
          if (!out) {
            auxTime = auxTime + (recordss[index].getTimeRecord() - time)
            time = recordss[index].getTimeRecord()
          } else {
            time = recordss[index].getTimeRecord()
          }
        }
      }
      if (auxTime >= (defaultMinutes * millisecondsPerMinute)) {
        return 1
      }
      out = !recordss[index].getLocalized()
    }
    if (auxTime >= (defaultMinutes * millisecondsPerMinute)) {
      return 1
    } else {
      return 0
    }
  } else {
    return -1
  }
}

const _elapsedTime = async (idClassday, student) => {
  const recordss = await Record.find({ user: student._id, classday: idClassday }).sort({ createdAt: 1 }).exec()

  if (recordss !== null && recordss.length > 0) {
    let time = recordss[0].getTimeRecord()
    let auxTime = recordss[0].getTimeRecord() - recordss[0].getTimeRecord()
    let initial = true
    let out = false
    for (let index = 0; index < recordss.length; index++) {
      if (recordss[index].getLocalized()) {
        if (initial) {
          initial = false
          time = recordss[index].getTimeRecord()
        } else {
          if (!out) {
            auxTime = auxTime + (recordss[index].getTimeRecord() - time)
            time = recordss[index].getTimeRecord()
          } else {
            time = recordss[index].getTimeRecord()
          }
        }
      } else {
        if (initial) {
          initial = false
          auxTime = recordss[index].getTimeRecord() - time
          time = recordss[index].getTimeRecord()
        } else {
          if (!out) {
            auxTime = auxTime + (recordss[index].getTimeRecord() - time)
            time = recordss[index].getTimeRecord()
          } else {
            time = recordss[index].getTimeRecord()
          }
        }
      }
      out = !recordss[index].getLocalized()
    }
    return auxTime
  } else {
    return -1
  }
}


export {
  finishClassday,
  addAttendance,
  attendanceList,
  attendanceRecord,
  presentStudentList,
  getClassdays,
}