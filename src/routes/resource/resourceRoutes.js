import express from 'express'


import checkAuth from '../../middleware/checks/checkAuth.js'
import cacheInit from '../../middleware/cacheHandle.js'
import { validateGetProfessorships, validateProfile } from '../../validators/resource/resourceValid.js'
import { getProfessorshipsStudents, getProfessorships, getProfessorshipsProfessors, profile } from '../../controllers/resource/resourceController.js'
import guard from '../../middleware/checks/guardHandle.js'

const router = express.Router()


// Rutas de recursos de prueba para los distintos rolles
router.get('/admin/profile', validateProfile, checkAuth, guard(['Admin']), profile)
router.get('/admin/professorships', validateGetProfessorships, checkAuth, guard(['Admin']), getProfessorships)

router.get('/bedels/profile', validateProfile, checkAuth, guard(['Bedel']), profile)
router.get('/bedels/professorships', validateGetProfessorships, checkAuth, guard(['Bedel']), getProfessorships)

router.get('/professors/profile', cacheInit, validateProfile, checkAuth, guard(['Profesor']), profile)
router.get('/professors/professorships', cacheInit, validateGetProfessorships, checkAuth, guard(['Profesor']), getProfessorshipsProfessors)

router.get('/students/profile', validateProfile, checkAuth, guard(['Estudiante']), profile)
router.get('/students/professorships', validateGetProfessorships, checkAuth, guard(['Estudiante']), getProfessorshipsStudents)



export default router

// SUAGGER

/**
 *  @swagger
 *  /api/professorship/{id}:
 *  get:
 *    summary: Ruta de acceso a información de la cátedra
 *    tags: [Resource]
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
 *        descripción: Id de la cátedra
 *        example:
 *          ObjectId
 *    responses:
 *      200:
 *        description:  |
 *          - {}
 *      401:
 *        description:  |
 *          - La cátedra no fue encontrada.
 *      500:
 *        description:  |
 *          - La cátedra no fue encontrada.
 */
/**
 *  @swagger
 *  /api/professorship-info/professorship/{professorship}/semester/{semester}:
 *  get:
 *    summary: Ruta de acceso a información de la cátedra
 *    tags: [Resource]
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
 *        name: semester
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
 *          - La cátedra no fue encontrada.
 */

// Rutas del rol Bedels
/**
 *  @swagger
 *  /api/bedels/profile:
 *  get:
 *    summary: Ruta de prueba para la consulta del perfil solo para Bedels
 *    tags: [Resource]
 *    components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: https
 *          scheme: bearer
 *          bearerFormat: JWT
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Datos de envío.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: String
 *                name:
 *                  type: String
 *                dni:
 *                  type: String
 *                email:
 *                  type: String
 *              example:
 *                _id:  64cdcd96fa3f1a687600e453.
 *                name: Prueba
 *                dni:  99999999
 *                email:  prueba@gmail.com
 */
/**
 *  @swagger
 *  /api/bedels/professorships:
 *  get:
 *    summary: Ruta de acceso a las cátedras
 *    tags: [Resource]
 *    components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: https
 *          scheme: bearer
 *          bearerFormat: JWT
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        {}
 *
 */

// Rutas del rol Student
/**
 *  @swagger
 *  /api/students/profile:
 *  get:
 *    summary: Ruta de prueba para la consulta del perfil solo para Estudiantes
 *    tags: [Resource]
 *    components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: https
 *          scheme: bearer
 *          bearerFormat: JWT
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Datos de envío.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: String
 *                name:
 *                  type: String
 *                dni:
 *                  type: String
 *                email:
 *                  type: String
 *              example:
 *                _id:  64cdcd96fa3f1a687600e453.
 *                name: Prueba
 *                dni:  99999999
 *                email:  prueba@gmail.com
 */
/**
 *  @swagger
 *  /api/students/professorships:
 *  get:
 *    summary: Ruta de acceso a las catedras que tiene asignado el alumno
 *    tags: [Resource]
 *    components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: https
 *          scheme: bearer
 *          bearerFormat: JWT
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Datos de envío.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: ObjectId
 *                  $ref: "#/components/schemas/User"
 *                department:
 *                  type: array
 *                  items:
 *                    type: ObjectId
 *                    $ref: "#/components/schemas/Department"
 *
 */
/**
 *  @swagger
 *  /api/students/professorship-info/professorship/{professorship}/semester/{semester}:
 *  get:
 *    summary: Ruta de acceso a información de la cátedra
 *    tags: [Resource]
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
 *        name: semester
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
 *          - La cátedra no fue encontrada.
 */

// Rutas del rol Professor
/**
 *  @swagger
 *  /api/professors/profile:
 *  get:
 *    summary: Ruta de prueba para la consulta del perfil solo para Profesores
 *    tags: [Resource]
 *    components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: https
 *          scheme: bearer
 *          bearerFormat: JWT
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Datos de envío.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: String
 *                name:
 *                  type: String
 *                dni:
 *                  type: String
 *                email:
 *                  type: String
 *              example:
 *                _id:  64cdcd96fa3f1a687600e453.
 *                name: Prueba
 *                dni:  99999999
 *                email:  prueba@gmail.com
 */


/**
 *  @swagger
 *  /api/professors/professorships:
 *  get:
 *    summary: Ruta de acceso a las cátedras que tiene asignado el profesor
 *    tags: [Resource]
 *    components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: https
 *          scheme: bearer
 *          bearerFormat: JWT
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Datos de envío.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: ObjectId
 *                  $ref: "#/components/schemas/User"
 *                department:
 *                  type: array
 *                  items:
 *                    type: ObjectId
 *                    $ref: "#/components/schemas/Department"
 *
 */

// Rutas del rol Admin
/**
 *  @swagger
 *  /api/admin/profile:
 *  get:
 *    summary: Ruta para la consulta del perfil solo para Admin
 *    tags: [Resource]
 *    components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: https
 *          scheme: bearer
 *          bearerFormat: JWT
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Datos de envío.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: String
 *                name:
 *                  type: String
 *                dni:
 *                  type: String
 *                email:
 *                  type: String
 *              example:
 *                _id:  64cdcd96fa3f1a687600e453.
 *                name: Prueba
 *                dni:  99999999
 *                email:  prueba@gmail.com
 */
/**
 *  @swagger
 *  /api/admin/professorships:
 *  get:
 *    summary: Ruta de acceso a las cátedras
 *    tags: [Resource]
 *    components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: https
 *          scheme: bearer
 *          bearerFormat: JWT
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        {}
 *
 */
