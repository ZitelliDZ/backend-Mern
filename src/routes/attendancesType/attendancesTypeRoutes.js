import express from 'express'

import { checkAuth } from '../../middleware/checks/checkAuth.js'
import { getAttendancestype } from '../../controllers/attendancesType/attendancesTypeController.js'


const router = express.Router()

// Recursos
router.get('/attendances-type', checkAuth, getAttendancestype)



export default router

// SUAGGER

/**
 *  @swagger
 *  /api/attendances-type:
 *  get:
 *    summary: Ruta de acceso a los tipos de asistencia
 *    tags: [Attendances-Type]
 *    responses:
 *      200:
 *        description:  |
 *          - {"attendancesType": [{"_id": "64e68c678622595d2109617a","name": "Asistencia presencial"}]}
 *      500:
 *        description:  |
 *          - Error al buscar los tipos de asistencias.
 */
