import express from 'express'

import { checkAuth } from '../../middleware/checks/checkAuth.js'
import { getRoles } from '../../controllers/roles/rolesController.js'


const router = express.Router()

// Recursos
router.get('/roles', checkAuth, getRoles)


export default router

// SUAGGER
/**
 *  @swagger
 *  /api/roles:
 *  get:
 *    summary: Ruta de acceso a los roles
 *    tags: [Rol]
 *    responses:
 *      200:
 *        description:  |
 *          - { "roles": [ { "_id": "64e68c548622595d210960ce", "name": "Admin" }]}
 *      500:
 *        description:  |
 *          - Error al buscar los roles.
 */