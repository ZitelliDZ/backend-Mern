import express from 'express'

import { validateAuthenticate, validateChangeInitialData, validateProfile, validateRegister, validateVerifyToken } from '../../../validators/auth/login/loginValid.js'
import { authenticate, changeInitialData, profile, register, verifyToken } from '../../../controllers/auth/login/loginController.js'
import checkAuth from '../../../middleware/checks/checkAuth.js'
import guard from '../../../middleware/checks/guardHandle.js'

const router = express.Router()

router.post('/login', validateAuthenticate, authenticate)
router.post('/', checkAuth, guard(['user-create']), validateRegister, register)
router.post('/verificar-token', validateVerifyToken, verifyToken)
router.post('/initial-data/change/:token', validateChangeInitialData, checkAuth, changeInitialData)
router.get('/profile', validateProfile, checkAuth, profile)

export default router



// SUAGGER

/**
 *  @swagger
 *  /api/users:
 *  post:
 *    summary: Ruta para el registro de un nuevo usuario
 *    tags: [Login]
 *    components:
 *      securitySchemes:
 *        bearerAuth:
 *          type: https
 *          scheme: bearer
 *          bearerFormat: JWT
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          charset: utf-8
 *          schema:
 *            type: object
 *            properties:
 *              dni:
 *                type: String,
 *                required: true,
 *              name:
 *                type: String,
 *                required: true,
 *              password:
 *                type: String,
 *                required: true,
 *              email:
 *                type: String,
 *                required: true,
 *              rol:
 *                type: String,
 *                required: true,
 *            required:
 *              - dni
 *              - name
 *              - password
 *              - email
 *              - rol
 *            example:
 *              dni: 55555555
 *              name: Diego
 *              password: ABCD1234
 *              email: example@gmail.com
 *              rol: Estudiante
 *    responses:
 *      200:
 *        description: Datos de envío.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: String,
 *                _id:
 *                  type: String,
 *                name:
 *                  type: String,
 *                email:
 *                  type: String,
 *                isFirstLogin:
 *                  type: Boolean,
 *                personalPhoneId:
 *                  type: Boolean,
 *                roles:
 *                  type: Array,
 *                token:
 *                  type: String,
 *              example:
 *                msg: Logueado con éxito.
 *                _id: 64cdcd96fa3f1a687600e453.
 *                name: Prueba
 *                email: prueba@gmail.com
 *                isFirstLogin: true
 *                personalPhoneId: false
 *                roles: { _id 64cdcd96fa3f1a687600e453. - name Estudiante}
 *                token: Hash 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284
 *      409:
 *        description:  |
 *          - El usuario ya se encuentra registrado.
 *      500:
 *        description:  |
 *          - Error al registrar el usuario.
 */


/**
 *  @swagger
 *  /api/users/verificar-token:
 *  post:
 *    summary: Ruta para verificar si el token es válido
 *    tags: [Login]
 *    requestBody:
 *      content:
 *        application/json:
 *          charset: utf-8
 *          schema:
 *            type: object
 *            properties:
 *              dni:
 *                type: Number,
 *                required: true,
 *              token:
 *                type: String,
 *                required: true,
 *            required:
 *              - dni
 *              - token
 *            example:
 *              dni: 55555555
 *              token: 234444
 *    responses:
 *      200:
 *        description:  |
 *          - El token es válido.
 *      401:
 *        description:  |
 *          - El usuario no está registrado.
 *          - El código de recuperación no es válido.
 *      500:
 *        description:  |
 *          - Error al recuperar el token - Comuniquese al área de sistemas.
 */

/**
 *  @swagger
 *  /api/users/profile:
 *  get:
 *    summary: Ruta de prueba para la consulta del perfil
 *    tags: [Login]
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
 *                  type: String,
 *                name:
 *                  type: String,
 *                dni:
 *                  type: String,
 *                email:
 *                  type: String,
 *              example:
 *                _id: 64cdcd96fa3f1a687600e453.
 *                name: Prueba
 *                dni:  99999999
 *                email: prueba@gmail.com
 */

/**
 *  @swagger
 *  /api/users/initial-data/change/{token}:
 *  post:
 *    summary: Ruta para el cambio de datos iniciales
 *    tags: [Login]
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
 *              password:
 *                type: String,
 *                required: true,
 *              personalPhoneId:
 *                type: String,
 *                required: true,
 *            required:
 *              - pin
 *              - password
 *              - personalPhoneId
 *            example:
 *              pin: 234456
 *              password: 12sfd34
 *              personalPhoneId: 345xdvd43
 *    responses:
 *      200:
 *        description:  |
 *          - Datos iniciales cambiados con éxito.
 *      401:
 *        description:  |
 *          - El usuario no está registrado.
 *          - Restablece el pin si lo has olvidado.
 *          - El código de recuperación no es válido.
 *      500:
 *        description:  |
 *          - Error al guardar los datos iniciales.
 *          - Error al recuperar el token - Comuniquese al área de sistemas.
 */



/**
 *  @swagger
 *  /api/users/login:
 *  post:
 *    summary: Ruta de autenticación del usuario
 *    tags: [Login]
 *    requestBody:
 *      content:
 *        application/json:
 *          charset: utf-8
 *          schema:
 *            type: object
 *            properties:
 *              password:
 *                type: String,
 *                required: true,
 *              dni:
 *                type: String,
 *                required: true,
 *              personalPhoneId:
 *                type: String,
 *                required: true,
 *            required:
 *              - password
 *              - dni
 *              - personalPhoneId
 *            example:
 *              password: ABCD1234
 *              dni: 55555555
 *              personalPhoneId: sdf2846
 *    responses:
 *      200:
 *        description:  |
 *          - Logueado con Exito.
 *      401:
 *        description:  |
 *          - El usuario no está registrado.
 *          - Debe cambiar su contraseña.
 *          - El dni o la contraseña es incorrecta.
 *      500:
 *        description:  |
 *          - Error al recuperar el token - Comuniquese al área de sistemas.
 *          - Error al intentar iniciar sesión.
 */