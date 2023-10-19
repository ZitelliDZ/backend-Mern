import express from 'express'

import { checkAuth } from '../../middleware/checks/checkAuth.js'
import guard from '../../middleware/checks/guardHandle.js'
import cacheInit from '../../middleware/cacheHandle.js'

import { getInfoProfessorship, getInfoProfessorshipStudents, getProfessorship } from '../../controllers/professorship/professorshipController.js'
import { validateGetInfoProfessorship, validateGetProfessorship } from '../../validators/professorship/professorshipValid.js'

const router = express.Router()

// Recursos
router.get('/professorship/:id', cacheInit, validateGetProfessorship, checkAuth, getProfessorship)
router.get('/professorship-info/professorship/:professorship/semester/:semester', cacheInit, validateGetInfoProfessorship, checkAuth, guard(['Profesor', 'Bedel', 'Admin']), getInfoProfessorship)
router.get('/students/professorship-info/professorship/:professorship/semester/:semester', validateGetInfoProfessorship, checkAuth, guard(['Estudiante']), getInfoProfessorshipStudents)


export default router

// SUAGGER

/**
 *  @swagger
 *  /api/professorship/{id}:
 *  get:
 *    summary: Ruta de acceso a información de la cátedra
 *    tags: [Professorship]
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
/**
 *  @swagger
 *  /api/students/professorship-info/professorship/{professorship}/semester/{semester}:
 *  get:
 *    summary: Ruta de acceso a información de la cátedra
 *    tags: [Student]
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
