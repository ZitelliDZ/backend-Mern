import express from 'express'

import { checkAuth } from '../../../middleware/checks/checkAuth.js'

import { validateNewPin, validateResetPin, validateVerifyPin } from '../../../validators/auth/securityPin/securityPinValid.js'
import { newPin, resetPin, verifyPin } from '../../../controllers/auth/securityPin/securityPinController.js'


const router = express.Router()

router.get('/security-pin/reset-pin', validateResetPin, checkAuth, resetPin)
router.post('/security-pin/reset-pin/:token', validateNewPin, checkAuth, newPin)
router.get('/checkpin/:pin', validateVerifyPin, checkAuth, verifyPin)

export default router


/**
 *  @swagger
 *  /api/users/security-pin/reset-pin:
 *  get:
 *    summary: Ruta para el envío de email para el restablecimiento del pin
 *    tags: [Reset-Pin]
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
 *          - Se ha enviado un email para el cambio de su pin de seguridad.
 *      401:
 *        description:  |
 *          - El usuario no está registrado.
 *      500:
 *        description:  |
 *          - Error al recuperar el token - Comuniquese al área de sistemas.
 *          - Error al generar el email para el cambio del pin de seguridad.
 */
/**
 *  @swagger
 *  /api/users/security-pin/reset-pin/{token}:
 *  post:
 *    summary: Ruta para el restablecimiento del pin
 *    tags: [Reset-Pin]
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
 *          type: Number
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
 *              pin:
 *                type: String,
 *                required: true,
 *            required:
 *              - pin
 *            example:
 *              pin: 123423
 *    responses:
 *      200:
 *        description:  |
 *          - El pin ha sido cambiado con éxito.
 *      401:
 *        description:  |
 *          - El usuario no está registrado.
 *          - El código de recuperación no es válido.
 *      500:
 *        description:  |
 *          - Error al recuperar el token - Comuniquese al área de sistemas.
 *          - Error al guardar el pin.
 */
/**
 *  @swagger
 *  /api/users/checkpin/{pin}:
 *  get:
 *    summary: Ruta para verificar el pin del usuario - Acceso 'Estudiante', 'Profesor', 'Bedel', 'Admin'
 *    tags: [Reset-Pin]
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
 *        name: pin
 *        schema:
 *          type: ObjectId
 *        descripción: pin del usuario
 *        example:
 *          456789
 *    responses:
 *      200:
 *        description:  |
 *          - {msg:'Pin correcto.'}
 *      401:
 *        description:  |
 *          - El pin no es válido.
 *          - Genere el pin de validación.
 *      500:
 *        description:  |
 *          - Error al verificar el Pin.
 */
