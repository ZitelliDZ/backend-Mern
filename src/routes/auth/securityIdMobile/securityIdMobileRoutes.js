import express from 'express'

import { checkAuth } from '../../../middleware/checks/checkAuth.js'


import { includeMobileId, resetMobileId } from '../../../controllers/auth/securityIdMobile/securityIdMobileController.js'
import { validateIncludeMobileId } from '../../../validators/auth/securityIdMobile/securityIdMobileValid.js'

const router = express.Router()



router.post('/reset-mobile-id', checkAuth, resetMobileId)
router.post('/reset-mobile-id/:token', validateIncludeMobileId, checkAuth, includeMobileId)







export default router




/**
 *  @swagger
 *  /api/users/reset-mobile-id:
 *  post:
 *    summary: Ruta para el envío de email del restablecimiento del dispositivo
 *    tags: [Reset-Mobile]
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
 *        description:  |
 *          - Se ha enviado un email para el cambio de su dispositivo.
 *      401:
 *        description:  |
 *          - El usuario no está registrado.
 *      500:
 *        description:  |
 *          - Error al recuperar el token - Comuniquese al área de sistemas.
 *          - Error al generar el email para el cambio del dispositivo móvil.
 */
/**
 *  @swagger
 *  /api/users/reset-mobile-id/{token}:
 *  post:
 *    summary: Ruta para el restablecimiento del dispositivo
 *    tags: [Reset-Mobile]
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
 *        name: token
 *        schema:
 *          type: String
 *        descripción: Token de recuperación único que se envia por email
 *        example:
 *          233565
 *    requestBody:
 *      content:
 *        application/json:
 *          charset: utf-8
 *          schema:
 *            type: object
 *            properties:
 *              personalPhoneId:
 *                type: String,
 *                required: true,
 *            required:
 *              - personalPhoneId
 *            example:
 *              personalPhoneId: 7f83b1657ff1f
 *    responses:
 *      200:
 *        description:  |
 *          - El usuario no está registrado.
 *      401:
 *        description:  |
 *          - El código de recuperación no es válido.
 *      409:
 *        description:  |
 *          - Ya existe un usuario utilizando el dispositivo.
 *      500:
 *        description:  |
 *          - Error al cambiar el dispositivo.
 *          - Error al recuperar el token - Comuniquese al área de sistemas.
 */