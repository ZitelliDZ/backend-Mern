import express from 'express'

import { checkAuth } from '../../middleware/checks/checkAuth.js'

import { getClassrooms } from '../../controllers/classroom/classroomController.js'
import { validateGetClassrooms } from '../../validators/classroom/classroomValid.js'

const router = express.Router()

// Recursos
router.get('/classrooms/:id/department', validateGetClassrooms, checkAuth, getClassrooms)



export default router

// SUAGGER

/**
 *  @swagger
 *  /api/classrooms/{id}/department:
 *  get:
 *    summary: Ruta de acceso a las Aulas
 *    tags: [Classroom]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: String
 *        descripción: Id de departamento del instituto.
 *        example:
 *          ObjectId
 *    responses:
 *      200:
 *        description:  |
 *          - {"classroms": [{"_id": "64e68c678622595d2109617a","name": "Aula Magna"}]}
 *      500:
 *        description:  |
 *          - Error al buscar las aulas.
 */