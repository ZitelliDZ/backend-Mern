import express from 'express'

import { newPassword, resetPassword } from '../../../controllers/auth/securityPassword/securityPasswordController.js'
import { validateNewPassword, validateResetPassword } from '../../../validators/auth/securityPassword/securityPasswordValid.js'

const router = express.Router()

router.post('/reset-password', validateResetPassword, resetPassword)
router.post('/reset-password/:token', validateNewPassword, newPassword)


export default router


/**
 *  @swagger
 *  /api/users/reset-password:
 *  post:
 *    summary: Ruta para el envío de email de recuperación de contraseña
 *    tags: [Reset-Password]
 *    requestBody:
 *      content:
 *        application/json:
 *          charset: utf-8
 *          schema:
 *            type: object
 *            properties:
 *              dni:
 *                type: String,
 *                required: true,
 *            required:
 *              - dni
 *            example:
 *              dni: 55555555
 *    responses:
 *      200:
 *        description:  |
 *          - Se ha enviado un email para el cambio de contraseña.
 *      401:
 *        description:  |
 *          - El usuario no está registrado.
 *      500:
 *        description:  |
 *          - Error al recuperar el token - Comuniquese al área de sistemas.
 *          - Error al generar el email para el restablecimiento de contraseña.
 */

/**
 *  @swagger
 *  /api/users/reset-password/{token}:
 *  post:
 *    summary: Ruta para el cambio de contraseña
 *    tags: [Reset-Password]
 *    parameters:
 *      - in: path
 *        name: token
 *        schema:
 *          type: String
 *        descripción: Token de recuperación único que se envía por email
 *        example:
 *          233567
 *    requestBody:
 *      content:
 *        application/json:
 *          charset: utf-8
 *          schema:
 *            type: object
 *            properties:
 *              dni:
 *                type: String,
 *                required: true,
 *              password:
 *                type: String,
 *                required: true,
 *            required:
 *              - dni
 *              - password
 *            example:
 *              password: ABCD1234
 *              dni: 55555555
 *    responses:
 *      200:
 *        description:  |
 *          - Contraseña modificada con éxito.
 *      401:
 *        description:  |
 *          - El usuario no está registrado.
 *          - El código de recuperación no es válido.
 *      500:
 *        description:  |
 *          - Error al recuperar el token - Comuniquese al área de sistemas.
 *          - Error al nodificar la contraseña.
 */