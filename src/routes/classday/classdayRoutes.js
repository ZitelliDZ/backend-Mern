import express from 'express'

import { checkAuth } from '../../middleware/checks/checkAuth.js'
import guard from '../../middleware/checks/guardHandle.js'

import checkPin from '../../middleware/checks/checkPin.js'
import { addAttendance, attendanceList, attendanceRecord, finishClassday, getClassdays, presentStudentList } from '../../controllers/classdays/classdaysController.js'
import { validateAddAttendance, validateAttendanceList, validateAttendanceRecord, validateAttendanceRecordWithPin, validateFinishClassday, validateGetClassdays, validatePresentStudentList } from '../../validators/classdays/classdayValid.js'


const router = express.Router()

router.get('/classdays/professorship/:professorship/semester/:id', validateGetClassdays, checkAuth, getClassdays)
router.get('/classdays/finishclass/:id', validateFinishClassday, checkAuth, guard(['Profesor', 'Bedel', 'Admin']), finishClassday)
router.get('/classdays/attendance-list/:id', validateAttendanceList, checkAuth, guard(['Profesor', 'Bedel', 'Admin']), attendanceList)
router.post('/classdays/add-attendance/:id', validateAddAttendance, checkAuth, guard(['Profesor', 'Bedel', 'Admin']), addAttendance)
router.post('/classdays/attendance-record/:id', validateAttendanceRecord, checkAuth, guard(['Estudiante', 'Profesor', 'Bedel', 'Admin']), attendanceRecord)
router.post('/classdays/attendance-record/with-pin/:id', validateAttendanceRecordWithPin, checkAuth, checkPin, guard(['Estudiante', 'Profesor', 'Bedel', 'Admin']), attendanceRecord)
router.get('/classdays/present-student-list/:id', validatePresentStudentList, checkAuth, guard(['Profesor', 'Bedel', 'Admin']), presentStudentList)

export default router




/**
 *  @swagger
 *  /api/classdays/finishclass/{id}:
 *  get:
 *    summary: Ruta de acceso para finalizar la clase y generar la lista de asistencia - Acceso 'Profesor', 'Bedel', 'Admin'
 *    tags: [Classday]
 *    components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: https
 *          scheme: bearer
 *          bearerFormat: JWT
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: ObjectId
 *        descripción: Id de la clase
 *        example:
 *          ObjectId
 *    responses:
 *      200:
 *        description:  |
 *          - Se ha generado exitosamente las asistencias.
 *      401:
 *        description:  |
 *          - La clase no fue encontrada.
 *          - La clase se encuentra finalizada.
 *      500:
 *        description:  |
 *          - Error al intentar generar los registros de asistencia.
 */


/**
 *  @swagger
 *  /api/classdays/attendance-list/{id}:
 *  get:
 *    summary: Ruta de acceso para obtener la lista de asistencia - Acceso 'Profesor', 'Bedel', 'Admin'
 *    tags: [Classday]
 *    components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: https
 *          scheme: bearer
 *          bearerFormat: JWT
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: ObjectId
 *        descripción: Id de la clase
 *        example:
 *          ObjectId
 *    responses:
 *      200:
 *        description:  |
 *          - {}
 *      401:
 *        description:  |
 *          - La clase no fue encontrada.
 *      500:
 *        description:  |
 *          - Error al intentar obtener la lista de asistencia.
 */



/**
 *  @swagger
 *  /api/classdays/add-attendance/{id}:
 *  post:
 *    summary: Ruta de acceso para agregar una asistencia - Acceso 'Profesor', 'Bedel', 'Admin'
 *    tags: [Classday]
 *    components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: https
 *          scheme: bearer
 *          bearerFormat: JWT
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: String
 *        descripción: Id de la clase
 *        example:
 *          ObjectId
 *    requestBody:
 *      content:
 *        application/json:
 *          charset: utf-8
 *          schema:
 *            type: object
 *            properties:
 *              user:
 *                type: ObjectId,
 *                required: true,
 *              rol:
 *                type: ObjectId,
 *                required: true,
 *              attendanceType:
 *                type: ObjectId,
 *                required: true,
 *            required:
 *              - user
 *              - rol
 *              - attendanceType
 *            example:
 *              user: ObjectId
 *              rol: ObjectId
 *              attendanceType: ObjectId
 *    responses:
 *      200:
 *        description:  |
 *          - Éxito al agregar la asistencia.
 *      401:
 *        description:  |
 *          - La clase no fue encontrada.
 *          - La clase sigue activa.
 *          - El usuario no está registrado.
 *          - El rol no se encuentra registrado.
 *          - El tipo de asistencia no se encuentra registrada.
 *          - El tipo de asistencia no se encuentra registrada.
 *      500:
 *        description:  |
 *          - Error al intentar obtener la lista de asistencia.
 *
 */



/**
 *  @swagger
 *  /api/classdays/attendance-record/{id}:
 *  post:
 *    summary: Ruta para el almacenamiento de un registro de asistencia - Acceso 'Estudiante', 'Profesor', 'Bedel', 'Admin'
 *    tags: [Classday]
 *    components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: https
 *          scheme: bearer
 *          bearerFormat: JWT
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: ObjectId
 *        descripción: Id de la clase
 *        example:
 *          ObjectId
 *    requestBody:
 *      content:
 *        application/json:
 *          charset: utf-8
 *          schema:
 *            type: object
 *            properties:
 *              localized:
 *                type: Boolean,
 *                required: true,
 *            required:
 *              - localized
 *            example:
 *              localized: true
 *    responses:
 *      200:
 *        description:  |
 *          - {}
 *      401:
 *        description:  |
 *          - La clase no fue encontrada.
 *          - No se encuentra en horario de clase.
 *      500:
 *        description:  |
 *          - Error al guardar el registro de asistencia.
 */

/**
 *  @swagger
 *  /api/classdays/attendance-record/with-pin/{id}:
 *  post:
 *    summary: Ruta para el almacenamiento de un registro de asistencia - Acceso 'Estudiante', 'Profesor', 'Bedel', 'Admin'
 *    tags: [Classday]
 *    components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: https
 *          scheme: bearer
 *          bearerFormat: JWT
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: ObjectId
 *        descripción: Id de la clase
 *        example:
 *          ObjectId
 *    requestBody:
 *      content:
 *        application/json:
 *          charset: utf-8
 *          schema:
 *            type: object
 *            properties:
 *              localized:
 *                type: Boolean,
 *                required: true,
 *              pin:
 *                type: String,
 *                required: true,
 *            required:
 *              - localized
 *              - pin
 *            example:
 *              localized: true
 *              pin: 456456
 *    responses:
 *      200:
 *        description:  |
 *          - {}
 *      401:
 *        description:  |
 *          - La clase no fue encontrada.
 *          - No se encuentra en horario de clase.
 *      500:
 *        description:  |
 *          - Error al guardar el registro de asistencia.
 */


/**
 *  @swagger
 *  /api/classdays/present-student-list/{id}:
 *  get:
 *    summary: Ruta de acceso para obtener la lista de presencialidad de los usuarios de una clase - Acceso 'Profesor', 'Bedel', 'Admin'
 *    tags: [Classday]
 *    components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: https
 *          scheme: bearer
 *          bearerFormat: JWT
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: ObjectId
 *        descripción: Id de la clase
 *        example:
 *          ObjectId
 *    responses:
 *      200:
 *        description:  |
 *          - {}
 *      401:
 *        description:  |
 *          - La clase no fue encontrada.
 *      500:
 *        description:  |
 *          - Error al buscar la presencialidad de los usuarios.
 */

/**
 *  @swagger
 *  /api/classdays/professorship/{professorship}/semester/{id}:
 *  get:
 *    summary: Ruta de acceso a información de la cátedra
 *    tags: [Classday]
 *    components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: https
 *          scheme: bearer
 *          bearerFormat: JWT
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: professorship
 *        schema:
 *          type: ObjectId
 *        descripción: Id de la cátedra
 *        example:
 *          ObjectId
 *      - in: path
 *        name: id
 *        schema:
 *          type: ObjectId
 *        descripción: Id del semestre
 *        example:
 *          ObjectId
 *    responses:
 *      200:
 *        description:  |
 *          - {}
 *      500:
 *        description:  |
 *          - Error al buscar los dias de clase.
 */
