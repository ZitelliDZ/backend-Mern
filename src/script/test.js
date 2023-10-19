import connectDB from '../config/dbConfig.js'
import Infouser from '../models/Infouser.js'
import Permission from '../models/Permission.js'
import Rol from '../models/Rol.js'
import User from '../models/User.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import pc from 'picocolors'
import Department from '../models/Department.js'
import Career from '../models/Career.js'
import Professorship from '../models/Professorship.js'
import Semester from '../models/Semester.js'
import Classroom from '../models/Classroom.js'
import Classday from '../models/Classday.js'
import ProfessorshipSemesterClassday from '../models/Professorship_Semester_Classday.js'
import Record from '../models/Record.js'
import setTZ from 'set-tz'
import Attendancetype from '../models/Attendancetype.js'
import ProfessorshipSemesterUser from '../models/Professorship_Semester_User.js'
import Attendance from '../models/Attendance.js'
const script = async () => {
  setTZ('America/Buenos_Aires')

  dotenv.config({ path: '.env.test' })
  await connectDB()
  // -----------BORRAR DATOS-----------------
  await mongoose.connection.dropDatabase()
  // ----------------------------------------
  const infoUserAdmin = await Infouser.createInfo(null, null, null, '987123', false, null)
  let superUser = await User.createUser(11111111, 'Admin, Admin', '123456789', 'admin@admin.com', infoUserAdmin._id, [])
  superUser = await superUser.setInfouser(infoUserAdmin)
  const infoUserOrderly = await Infouser.createInfo(null, null, null, '987123', false, null)
  let orderlyUser = await User.createUser(22222222, 'Bedel, Bedel', '123456789', 'orderly@orderly.com', infoUserOrderly._id, [])
  orderlyUser = await orderlyUser.setInfouser(infoUserOrderly)
  const infoUserProfessor = await Infouser.createInfo(null, null, null, '987123', false, null)
  let professorUser = await User.createUser(33333333, 'Profesor, Profesor', '123456789', 'professor@professor.com', infoUserProfessor._id, [])
  professorUser = await professorUser.setInfouser(infoUserProfessor)
  const infoUserStudent = await Infouser.createInfo(null, null, null, '987123', false, null)
  let studentUser = await User.createUser(44444444, 'Estudiante, Estudiante', '123456789', 'estudent@estudent.com', infoUserStudent._id, [])
  studentUser = await studentUser.setInfouser(infoUserStudent)
  const infoUserAnon = await Infouser.createInfo(null, null, null, '987123', false, null)
  const anonUser = await User.createUser(55555555, 'Usuario sin rol, Usuario sin rol', '123456789', 'anon@anon.com', infoUserAnon._id, [])
  await anonUser.setInfouser(infoUserAnon)

  const infoUserProfessor1 = await Infouser.createInfo(null, null, null, '987123', false, null, '123456')
  let professor1User = await User.createUser(10000013, 'Profesor1, Profesor1', '123456789', 'Profesor1@gmail.com', infoUserProfessor1._id, [])
  professor1User = await professor1User.setInfouser(infoUserProfessor1)

  const infoUserProfessor2 = await Infouser.createInfo(null, null, null, '987123', false, null, '123456')
  let professor2User = await User.createUser(10000014, 'Profesor2, Profesor2', '123456789', 'Profesor2@gmail.com', infoUserProfessor2._id, [])
  professor2User = await professor2User.setInfouser(infoUserProfessor2)

  const infoUserProfessor3 = await Infouser.createInfo(null, null, null, '987123', false, null, '123456')
  let professor3User = await User.createUser(10000015, 'Profesor3, Profesor3', '123456789', 'Profesor3@gmail.com', infoUserProfessor3._id, [])
  professor3User = await professor3User.setInfouser(infoUserProfessor3)

  const infoUserProfessor4 = await Infouser.createInfo(null, null, null, '987123', false, null, '123456')
  let professor4User = await User.createUser(10000016, 'Profesor4, Profesor4', '123456789', 'Profesor4@gmail.com', infoUserProfessor4._id, [])
  professor4User = await professor4User.setInfouser(infoUserProfessor4)

  const infoUserStudent1 = await Infouser.createInfo(null, null, null, '987123', false, null, '123456')
  let studentUser1 = await User.createUser(10000001, 'Alumno1, Alumno1', '123456789', 'Alumno1@hotmail.com', infoUserStudent1._id, [])
  studentUser1 = await studentUser1.setInfouser(infoUserStudent1)
  const infoUserStudent2 = await Infouser.createInfo(null, null, null, '987123', false, null, '123456')
  let studentUser2 = await User.createUser(10000002, 'Alumno2, Alumno2', '123456789', 'Alumno2@gmail.com', infoUserStudent2._id, [])
  studentUser2 = await studentUser2.setInfouser(infoUserStudent2)
  const infoUserStudent3 = await Infouser.createInfo(null, null, null, '987123', false, null, '123456')
  let studentUser3 = await User.createUser(10000003, 'Alumno3, Alumno3', '123456789', 'Alumno3@gmail.com', infoUserStudent3._id, [])
  studentUser3 = await studentUser3.setInfouser(infoUserStudent3)
  const infoUserStudent4 = await Infouser.createInfo(null, null, null, '987123', false, null, '123456')
  let studentUser4 = await User.createUser(10000004, 'Alumno4, Alumno4', '123456789', 'Alumno4@hotmail.com', infoUserStudent4._id, [])
  studentUser4 = await studentUser4.setInfouser(infoUserStudent4)
  const infoUserStudent5 = await Infouser.createInfo(null, null, null, '987123', false, null, '123456')
  let studentUser5 = await User.createUser(10000005, 'Alumno5, Alumno5', '123456789', 'Alumno5@gmail.com', infoUserStudent5._id, [])
  studentUser5 = await studentUser5.setInfouser(infoUserStudent5)

  const infoUserStudent6 = await Infouser.createInfo(null, null, null, '987123', false, null, '123456')
  let studentUser6 = await User.createUser(10000006, 'Alumno6, Alumno6', '123456789', 'Alumno6@gmail.com', infoUserStudent6._id, [])
  studentUser6 = await studentUser6.setInfouser(infoUserStudent6)

  const infoUserStudent7 = await Infouser.createInfo(null, null, null, '987123', false, null, '123456')
  let studentUser7 = await User.createUser(10000007, 'Alumno7, Alumno7', '123456789', 'Alumno7@gmail.com', infoUserStudent7._id, [])
  studentUser7 = await studentUser7.setInfouser(infoUserStudent7)

  const infoUserStudent8 = await Infouser.createInfo(null, null, null, '987123', false, null, '123456')
  let studentUser8 = await User.createUser(10000008, 'Alumno8, Alumno8', '123456789', 'Alumno8@gmail.com', infoUserStudent8._id, [])
  studentUser8 = await studentUser8.setInfouser(infoUserStudent8)

  const infoUserStudent9 = await Infouser.createInfo(null, null, null, '987123', false, null, '123456')
  let studentUser9 = await User.createUser(10000009, 'Alumno9, Alumno9', '123456789', 'Alumno9@gmail.com', infoUserStudent9._id, [])
  studentUser9 = await studentUser9.setInfouser(infoUserStudent9)

  const infoUserStudent10 = await Infouser.createInfo(null, null, null, '987123', false, null, '123456')
  let studentUser10 = await User.createUser(10000010, 'Alumno10, Alumno10', '123456789', 'Alumno10@hotmail.com', infoUserStudent10._id, [])
  studentUser10 = await studentUser10.setInfouser(infoUserStudent10)

  const infoUserStudent11 = await Infouser.createInfo(null, null, null, '987123', false, null, '123456')
  let studentUser11 = await User.createUser(10000011, 'Alumno11, Alumno11', '123456789', 'Alumno11@gmail.com', infoUserStudent11._id, [])
  studentUser11 = await studentUser11.setInfouser(infoUserStudent11)

  const infoUserStudent12 = await Infouser.createInfo(null, null, null, '987123', false, null, '123456')
  let studentUser12 = await User.createUser(10000012, 'Alumno12, Alumno12', '123456789', 'Alumno12@hotmail.com', infoUserStudent12._id, [])
  studentUser12 = await studentUser12.setInfouser(infoUserStudent12)

  let adminRol = await Rol.createRol('Admin', [])
  await superUser.addRol(adminRol)
  const orderlyRol = await Rol.createRol('Bedel', [])
  await orderlyUser.addRol(orderlyRol)
  const professorRol = await Rol.createRol('Profesor', [])
  await professorUser.addRol(professorRol)
  await professor1User.addRol(professorRol)
  await professor2User.addRol(professorRol)
  await professor3User.addRol(professorRol)
  await professor4User.addRol(professorRol)

  const studentRol = await Rol.createRol('Estudiante', [])
  await studentUser.addRol(studentRol)
  await studentUser1.addRol(studentRol)
  await studentUser2.addRol(studentRol)
  await studentUser3.addRol(studentRol)
  await studentUser4.addRol(studentRol)
  await studentUser5.addRol(studentRol)
  await studentUser6.addRol(studentRol)
  await studentUser7.addRol(studentRol)
  await studentUser8.addRol(studentRol)
  await studentUser9.addRol(studentRol)
  await studentUser10.addRol(studentRol)
  await studentUser11.addRol(studentRol)
  await studentUser12.addRol(studentRol)

  let permission = await Permission.createPermission('user-create')
  adminRol = await adminRol.addPermission(permission)

  permission = await Permission.createPermission('user-update')
  adminRol = await adminRol.addPermission(permission)

  permission = await Permission.createPermission('user-read')
  adminRol = await adminRol.addPermission(permission)

  permission = await Permission.createPermission('user-delete')
  adminRol = await adminRol.addPermission(permission)

  const departmentIng = await Department.createDepartment('Departamento Ingeniería', 'ING')
  const careerIngInf = await Career.createCareer('Ingeniería en informática', departmentIng.getCode() + '-INF', departmentIng)
  const careerNutri = await Career.createCareer('Licenciatura en nutrición', departmentIng.getCode() + '-NUT', departmentIng)
  const careerArq = await Career.createCareer('Arquitectura', departmentIng.getCode() + '-ARQ', departmentIng)

  const professorshipIngSoft = await Professorship.createProfessorship('Ingeniería del Software', careerIngInf.code + '-INGSOFT', careerIngInf)
  const professorshipDis = await Professorship.createProfessorship('Diseño de Sistemas', careerIngInf.code + '-DIS', careerIngInf)
  const professorshipCal = await Professorship.createProfessorship('Cálculo Numérico', careerArq.code + '-CAL', careerArq)

  const semester_2_2023 = await Semester.createSemester('Semestre 2', 'SEM-2-2023', new Date(2023, 7, 14), new Date(2023, 10, 25), true)

  await ProfessorshipSemesterUser.createProsemesuser(professorshipIngSoft, [professor1User, professor2User, professor3User, professor4User], [studentUser1, studentUser2, studentUser3, studentUser4, studentUser5, studentUser6, studentUser7, studentUser8, studentUser9, studentUser10, studentUser11, studentUser12], semester_2_2023)

  await ProfessorshipSemesterUser.createProsemesuser(professorshipCal, [professor1User, professor2User, professor3User, professor4User], [studentUser1, studentUser2, studentUser3, studentUser4, studentUser5, studentUser6, studentUser7, studentUser8, studentUser9, studentUser10, studentUser11, studentUser12], semester_2_2023)

  await ProfessorshipSemesterUser.createProsemesuser(professorshipDis, [professor1User, professor2User, professor3User, professor4User], [studentUser1, studentUser2, studentUser3, studentUser4, studentUser5, studentUser6, studentUser7, studentUser8, studentUser9, studentUser10, studentUser11, studentUser12], semester_2_2023)

  /*

  const classroom1 = await Classroom.createClassroom('Aula Magna', departmentIng, -27.3702891, -55.9399895, 123.4000015258789, 10.0)
  const classroom2 = await Classroom.createClassroom('Aula 1', departmentIng, -27.3702891, -55.9399895, 123.4000015258789, 10.0)
  const classroom3 = await Classroom.createClassroom('Aula 2', departmentIng, -27.3702891, -55.9399895, 123.4000015258789, 10.0)
  const classroom4 = await Classroom.createClassroom('Aula 3', departmentIng, -27.3702891, -55.9399895, 123.4000015258789, 10.0)
  const classroom5 = await Classroom.createClassroom('Aula 4', departmentIng, -27.3702891, -55.9399895, 123.4000015258789, 10.0)
*/

  const classroom1 = await Classroom.createClassroom('Aula Magna', departmentIng, -27.3819421, -55.93132, 136.79998779296875, 10.0)
  const classroom2 = await Classroom.createClassroom('Aula 1', departmentIng, -27.3819421, -55.93132, 136.79998779296875, 10.0)
  const classroom3 = await Classroom.createClassroom('Aula 2', departmentIng, -27.3819421, -55.93132, 136.79998779296875, 10.0)
  const classroom4 = await Classroom.createClassroom('Aula 3', departmentIng, -27.3819421, -55.93132, 136.79998779296875, 10.0)
  const classroom5 = await Classroom.createClassroom('Aula 4', departmentIng, -27.3819421, -55.93132, 136.79998779296875, 10.0)

  /*
  const classroom1 = await Classroom.createClassroom('Aula Magna', departmentIng, -27.3940922, -55.9141244, 136.79998779296875, 10.0)
  const classroom2 = await Classroom.createClassroom('Aula 1', departmentIng, -27.3940922, -55.9141244, 136.79998779296875, 10.0)
  const classroom3 = await Classroom.createClassroom('Aula 2', departmentIng, -27.3940922, -55.9141244, 136.79998779296875, 10.0)
  const classroom4 = await Classroom.createClassroom('Aula 3', departmentIng, -27.3940922, -55.9141244, 136.79998779296875, 10.0)
  const classroom5 = await Classroom.createClassroom('Aula 4', departmentIng, -27.3940922, -55.9141244, 136.79998779296875, 10.0)
*/
  const type1 = await Attendancetype.createAttendancetype('Medias Faltas', 'Media Falta')
  const type2 = await Attendancetype.createAttendancetype('Asistencias parciales', 'Asistencia parcial')
  const type3 = await Attendancetype.createAttendancetype('Asistencias completas', 'Asistencia completa')
  const type4 = await Attendancetype.createAttendancetype('Faltas justificadas', 'Falta justificada')
  const type5 = await Attendancetype.createAttendancetype('Faltas no justificadas', 'Falta no justificada')

  let classday1 = await Classday.createClassday(1, classroom1, false, new Date(2023, 9, 6, 16, 0, 0), new Date(2023, 9, 6, 19, 0, 0))

  await Attendance.createAttendance(studentUser1, classday1, studentRol, true, type3)
  await Attendance.createAttendance(studentUser2, classday1, studentRol, true, type3)
  await Attendance.createAttendance(studentUser3, classday1, studentRol, true, type3)
  await Attendance.createAttendance(studentUser4, classday1, studentRol, true, type3)
  await Attendance.createAttendance(studentUser5, classday1, studentRol, true, type3)
  await Attendance.createAttendance(studentUser6, classday1, studentRol, true, type3)
  await Attendance.createAttendance(studentUser7, classday1, studentRol, true, type3)
  await Attendance.createAttendance(studentUser8, classday1, studentRol, true, type3)
  await Attendance.createAttendance(studentUser9, classday1, studentRol, true, type3)
  await Attendance.createAttendance(studentUser10, classday1, studentRol, true, type3)
  await Attendance.createAttendance(studentUser11, classday1, studentRol, true, type3)
  await Attendance.createAttendance(studentUser12, classday1, studentRol, true, type3)

  let newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipIngSoft, classday1, semester_2_2023)
  let classday2 = await Classday.createClassday(2, classroom1, false, new Date(2023, 9, 13, 16, 0, 0), new Date(2023, 9, 13, 19, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipIngSoft, classday2, semester_2_2023)

  await Attendance.createAttendance(studentUser1, classday2, studentRol, true, type3)
  await Attendance.createAttendance(studentUser2, classday2, studentRol, true, type2)
  await Attendance.createAttendance(studentUser3, classday2, studentRol, true, type2)
  await Attendance.createAttendance(studentUser4, classday2, studentRol, true, type1)
  await Attendance.createAttendance(studentUser5, classday2, studentRol, true, type1)
  await Attendance.createAttendance(studentUser6, classday2, studentRol, true, type3)
  await Attendance.createAttendance(studentUser7, classday2, studentRol, true, type3)
  await Attendance.createAttendance(studentUser8, classday2, studentRol, true, type2)
  await Attendance.createAttendance(studentUser9, classday2, studentRol, true, type2)
  await Attendance.createAttendance(studentUser10, classday2, studentRol, true, type1)
  await Attendance.createAttendance(studentUser11, classday2, studentRol, true, type1)
  await Attendance.createAttendance(studentUser12, classday2, studentRol, true, type3)

  let classday3 = await Classday.createClassday(3, classroom2, false, new Date(2023, 9, 19, 16, 0, 0), new Date(2023, 9, 19, 19, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipIngSoft, classday3, semester_2_2023)

  await Attendance.createAttendance(studentUser1, classday3, studentRol, true, type4)
  await Attendance.createAttendance(studentUser2, classday3, studentRol, true, type4)
  await Attendance.createAttendance(studentUser3, classday3, studentRol, true, type4)
  await Attendance.createAttendance(studentUser4, classday3, studentRol, true, type4)
  await Attendance.createAttendance(studentUser5, classday3, studentRol, true, type4)
  await Attendance.createAttendance(studentUser6, classday3, studentRol, true, type4)
  await Attendance.createAttendance(studentUser7, classday3, studentRol, true, type4)
  await Attendance.createAttendance(studentUser8, classday3, studentRol, true, type4)
  await Attendance.createAttendance(studentUser9, classday3, studentRol, true, type4)
  await Attendance.createAttendance(studentUser10, classday3, studentRol, true, type4)
  await Attendance.createAttendance(studentUser11, classday3, studentRol, true, type4)
  await Attendance.createAttendance(studentUser12, classday3, studentRol, true, type4)

  let classday4 = await Classday.createClassday(4, classroom4, false, new Date(2023, 9, 20, 16, 0, 0), new Date(2023, 9, 20, 19, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipIngSoft, classday4, semester_2_2023)

  await Attendance.createAttendance(studentUser1, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser2, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser3, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser4, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser5, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser6, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser7, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser8, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser9, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser10, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser11, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser12, classday4, studentRol, true, type3)

  let classday5 = await Classday.createClassday(5, classroom4, false, new Date(2023, 9, 26, 16, 0, 0), new Date(2023, 9, 26, 19, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipIngSoft, classday5, semester_2_2023)

  await Attendance.createAttendance(studentUser1, classday5, studentRol, true, type4)
  await Attendance.createAttendance(studentUser2, classday5, studentRol, true, type3)
  await Attendance.createAttendance(studentUser3, classday5, studentRol, true, type3)
  await Attendance.createAttendance(studentUser4, classday5, studentRol, true, type3)
  await Attendance.createAttendance(studentUser5, classday5, studentRol, true, type3)
  await Attendance.createAttendance(studentUser6, classday5, studentRol, true, type3)
  await Attendance.createAttendance(studentUser7, classday5, studentRol, true, type3)
  await Attendance.createAttendance(studentUser8, classday5, studentRol, true, type3)
  await Attendance.createAttendance(studentUser9, classday5, studentRol, true, type3)
  await Attendance.createAttendance(studentUser10, classday5, studentRol, true, type3)
  await Attendance.createAttendance(studentUser11, classday5, studentRol, true, type3)
  await Attendance.createAttendance(studentUser12, classday5, studentRol, true, type3)

  let classday6 = await Classday.createClassday(6, classroom4, true, new Date(2023, 9, 26, 18, 37, 0), new Date(2023, 9, 26, 21, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipIngSoft, classday6, semester_2_2023)
  const classday7 = await Classday.createClassday(7, classroom4, true, new Date(2023, 10, 3, 16, 0, 0), new Date(2023, 10, 3, 19, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipIngSoft, classday7, semester_2_2023)
  const classday8 = await Classday.createClassday(8, classroom4, true, new Date(2023, 10, 4, 16, 0, 0), new Date(2023, 10, 4, 19, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipIngSoft, classday8, semester_2_2023)
  const classday9 = await Classday.createClassday(9, classroom4, true, new Date(2023, 10, 10, 16, 0, 0), new Date(2023, 10, 10, 19, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipIngSoft, classday9, semester_2_2023)

  classday1 = await Classday.createClassday(1, classroom1, false, new Date(2023, 10, 7, 16, 0, 0), new Date(2023, 10, 7, 20, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipDis, classday1, semester_2_2023)

  await Attendance.createAttendance(studentUser1, classday1, studentRol, true, type5)
  await Attendance.createAttendance(studentUser2, classday1, studentRol, true, type3)
  await Attendance.createAttendance(studentUser3, classday1, studentRol, true, type5)
  await Attendance.createAttendance(studentUser4, classday1, studentRol, true, type3)
  await Attendance.createAttendance(studentUser5, classday1, studentRol, true, type5)
  await Attendance.createAttendance(studentUser6, classday1, studentRol, true, type3)
  await Attendance.createAttendance(studentUser7, classday1, studentRol, true, type5)
  await Attendance.createAttendance(studentUser8, classday1, studentRol, true, type3)
  await Attendance.createAttendance(studentUser9, classday1, studentRol, true, type5)
  await Attendance.createAttendance(studentUser10, classday1, studentRol, true, type3)
  await Attendance.createAttendance(studentUser11, classday1, studentRol, true, type5)
  await Attendance.createAttendance(studentUser12, classday1, studentRol, true, type3)

  classday2 = await Classday.createClassday(2, classroom1, false, new Date(2023, 10, 8, 16, 0, 0), new Date(2023, 10, 8, 20, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipDis, classday2, semester_2_2023)

  await Attendance.createAttendance(studentUser1, classday2, studentRol, true, type5)
  await Attendance.createAttendance(studentUser2, classday2, studentRol, true, type3)
  await Attendance.createAttendance(studentUser3, classday2, studentRol, true, type3)
  await Attendance.createAttendance(studentUser4, classday2, studentRol, true, type1)
  await Attendance.createAttendance(studentUser5, classday2, studentRol, true, type5)
  await Attendance.createAttendance(studentUser6, classday2, studentRol, true, type3)
  await Attendance.createAttendance(studentUser7, classday2, studentRol, true, type3)
  await Attendance.createAttendance(studentUser8, classday2, studentRol, true, type1)
  await Attendance.createAttendance(studentUser9, classday2, studentRol, true, type5)
  await Attendance.createAttendance(studentUser10, classday2, studentRol, true, type3)
  await Attendance.createAttendance(studentUser11, classday2, studentRol, true, type3)
  await Attendance.createAttendance(studentUser12, classday2, studentRol, true, type1)

  classday3 = await Classday.createClassday(3, classroom2, false, new Date(2023, 10, 14, 16, 0, 0), new Date(2023, 10, 14, 20, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipDis, classday3, semester_2_2023)

  await Attendance.createAttendance(studentUser1, classday3, studentRol, true, type1)
  await Attendance.createAttendance(studentUser2, classday3, studentRol, true, type3)
  await Attendance.createAttendance(studentUser3, classday3, studentRol, true, type3)
  await Attendance.createAttendance(studentUser4, classday3, studentRol, true, type2)
  await Attendance.createAttendance(studentUser5, classday3, studentRol, true, type1)
  await Attendance.createAttendance(studentUser6, classday3, studentRol, true, type3)
  await Attendance.createAttendance(studentUser7, classday3, studentRol, true, type3)
  await Attendance.createAttendance(studentUser8, classday3, studentRol, true, type2)
  await Attendance.createAttendance(studentUser9, classday3, studentRol, true, type1)
  await Attendance.createAttendance(studentUser10, classday3, studentRol, true, type3)
  await Attendance.createAttendance(studentUser11, classday3, studentRol, true, type3)
  await Attendance.createAttendance(studentUser12, classday3, studentRol, true, type2)

  classday4 = await Classday.createClassday(4, classroom4, false, new Date(2023, 10, 15, 16, 0, 0), new Date(2023, 10, 15, 20, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipDis, classday4, semester_2_2023)

  await Attendance.createAttendance(studentUser1, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser2, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser3, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser4, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser5, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser6, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser7, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser8, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser9, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser10, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser11, classday4, studentRol, true, type3)
  await Attendance.createAttendance(studentUser12, classday4, studentRol, true, type3)

  classday5 = await Classday.createClassday(5, classroom4, false, new Date(2023, 10, 21, 16, 0, 0), new Date(2023, 10, 21, 20, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipDis, classday5, semester_2_2023)

  await Attendance.createAttendance(studentUser1, classday5, studentRol, true, type4)
  await Attendance.createAttendance(studentUser2, classday5, studentRol, true, type4)
  await Attendance.createAttendance(studentUser3, classday5, studentRol, true, type4)
  await Attendance.createAttendance(studentUser4, classday5, studentRol, true, type4)
  await Attendance.createAttendance(studentUser5, classday5, studentRol, true, type4)
  await Attendance.createAttendance(studentUser6, classday5, studentRol, true, type4)
  await Attendance.createAttendance(studentUser7, classday5, studentRol, true, type4)
  await Attendance.createAttendance(studentUser8, classday5, studentRol, true, type4)
  await Attendance.createAttendance(studentUser9, classday5, studentRol, true, type4)
  await Attendance.createAttendance(studentUser10, classday5, studentRol, true, type4)
  await Attendance.createAttendance(studentUser11, classday5, studentRol, true, type4)
  await Attendance.createAttendance(studentUser12, classday5, studentRol, true, type4)

  classday6 = await Classday.createClassday(6, classroom4, false, new Date(2023, 10, 22, 16, 0, 0), new Date(2023, 10, 22, 20, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipDis, classday6, semester_2_2023)

  await Attendance.createAttendance(studentUser1, classday6, studentRol, true, type5)
  await Attendance.createAttendance(studentUser2, classday6, studentRol, true, type3)
  await Attendance.createAttendance(studentUser3, classday6, studentRol, true, type5)
  await Attendance.createAttendance(studentUser4, classday6, studentRol, true, type3)
  await Attendance.createAttendance(studentUser5, classday6, studentRol, true, type5)
  await Attendance.createAttendance(studentUser6, classday6, studentRol, true, type3)
  await Attendance.createAttendance(studentUser7, classday6, studentRol, true, type5)
  await Attendance.createAttendance(studentUser8, classday6, studentRol, true, type3)
  await Attendance.createAttendance(studentUser9, classday6, studentRol, true, type5)
  await Attendance.createAttendance(studentUser10, classday6, studentRol, true, type3)
  await Attendance.createAttendance(studentUser11, classday6, studentRol, true, type5)
  await Attendance.createAttendance(studentUser12, classday6, studentRol, true, type3)

  const hour = new Date()
  const vari = await Record.createRecord(studentUser1, classday7, true)
  await vari.setTimeRecord(new Date(hour.getTime() + 30 * 60 * 1000))

  await Record.createRecord(studentUser2, classday7, true)
  await Record.createRecord(studentUser3, classday7, true)
  await Record.createRecord(studentUser4, classday7, true)
  await Record.createRecord(studentUser5, classday7, true)
  const vari2 = await Record.createRecord(studentUser1, classday7, false)
  await vari2.setTimeRecord(new Date(hour.getTime() + 30 * 60 * 1000 + 15 * 60 * 1000))

  const vari3 = await Record.createRecord(studentUser1, classday7, true)
  await vari3.setTimeRecord(new Date(hour.getTime() + 30 * 60 * 1000 + 15 * 60 * 1000 + 40 * 60 * 1000))

  const vari4 = await Record.createRecord(studentUser1, classday7, false)
  await vari4.setTimeRecord(new Date(hour.getTime() + 30 * 60 * 1000 + 15 * 60 * 1000 + 40 * 60 * 1000 + 10 * 60 * 1000))

  const vari5 = await Record.createRecord(studentUser1, classday7, true)
  await vari5.setTimeRecord(new Date(hour.getTime() + 30 * 60 * 1000 + 15 * 60 * 1000 + 40 * 60 * 1000 + 10 * 60 * 1000 + 30 * 60 * 1000))

  classday1 = await Classday.createClassday(1, classroom2, true, new Date(2023, 2, 14, 20, 0, 0), new Date(2023, 2, 14, 22, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipDis, classday1, semester_2_2023)
  classday2 = await Classday.createClassday(2, classroom2, true, new Date(2023, 2, 15, 20, 0, 0), new Date(2023, 2, 15, 22, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipDis, classday2, semester_2_2023)
  classday3 = await Classday.createClassday(3, classroom1, true, new Date(2023, 2, 21, 20, 0, 0), new Date(2023, 2, 21, 22, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipDis, classday3, semester_2_2023)
  classday4 = await Classday.createClassday(4, classroom2, true, new Date(2023, 2, 22, 20, 0, 0), new Date(2023, 2, 22, 22, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipDis, classday4, semester_2_2023)
  classday5 = await Classday.createClassday(5, classroom2, true, new Date(2023, 2, 28, 20, 0, 0), new Date(2023, 2, 28, 22, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipDis, classday5, semester_2_2023)
  classday6 = await Classday.createClassday(6, classroom2, true, new Date(2023, 2, 29, 20, 0, 0), new Date(2023, 2, 29, 22, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipDis, classday6, semester_2_2023)

  classday1 = await Classday.createClassday(1, classroom3, true, new Date(2023, 10, 2, 14, 0, 0), new Date(2023, 10, 2, 18, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipCal, classday1, semester_2_2023)
  classday2 = await Classday.createClassday(2, classroom3, true, new Date(2023, 10, 9, 14, 0, 0), new Date(2023, 10, 9, 18, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipCal, classday2, semester_2_2023)
  classday3 = await Classday.createClassday(3, classroom5, true, new Date(2023, 10, 16, 14, 0, 0), new Date(2023, 10, 18, 16, 0, 0))
  newProfSemesClass = await ProfessorshipSemesterClassday.createProsemesclass(professorshipCal, classday3, semester_2_2023)

  console.log(`${pc.cyan(pc.italic('Proceso terminado para el entorno Test.. Press Ctrl + C.'))}`)
}
await script()
export default script
