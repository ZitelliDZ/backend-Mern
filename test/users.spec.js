import request from 'supertest'
import server from './index.js'
import User from '../src/models/User.js'
import Infouser from '../src/models/Infouser.js'
import * as fs from 'fs'
import path from 'path'

// cors
const origin = process.env.FRONTEND_URL

// ----------Datos y objetos de prueba------------------------------------------------------------

const studenUser = await User.findOne({ dni: 10000002 })
const studenPassword = '123456789'
const infoStudenUser = await Infouser.findById(studenUser.infouser)
const adminUser = await User.findOne({ dni: 11111111 })
const adminPassword = '123456789'
const infoAdminUser = await Infouser.findById(adminUser.infouser)

const newUser = new User()
newUser.name = 'Nuevo User'
newUser.email = 'NuevoUser@gmail.com'
newUser.dni = 77777777
newUser.password = '123456789'

const nonexistentUser = new User()
nonexistentUser.name = 'Nonexistent  User'
nonexistentUser.email = 'NonexistentUser@gmail.com'
nonexistentUser.dni = 66666666
nonexistentUser.password = '123456789'
nonexistentUser.personalPhoneId = 'asd'

let tokenSessionAdmin
let tokenSessionStudent
// SSl
const options = {
  key: fs.readFileSync(path.join(process.cwd(), 'src', 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(process.cwd(), 'src', 'cert', 'cert.pem'))
}

// ------------------------------------------------------------------------------------
/*
  Describe - El intento de un usuario Admin para registrar un nuevo usuario como Estudiante.
  ✔️  El usuario falla en el intento de iniciar sesión - Res: El usuario no esta registrado.
  ✔️  El usuario intenta registrar un nuevo usuario sin haberse autenticado - Res: No se encuentra autenticado.
  ❌  El usuario realiza su primer inicio de sesión - Res: Debe cambiar su contraseña.
  ✔️  El usuario se loguea con éxito.
  ✔️  El usuario se loguea con éxito e intente guardar un usuario sin tener el rol asignado - Res: Acceso denegado.
  ✔️  El usuario se loguea con éxito e intente guardar un usuario existente - Res: El usuario ya se encuentra registrado.
  ✔️  El usuario se loguea con éxito y guardada el registro del nuevo usuario.
*/
describe('Describe - El intento de un usuario Admin para registrar un nuevo usuario como Estudiante', () => {
  test('debería responder con un código de estado 401 - POST /api/users/login - El usuario falla en el intento de iniciar sesión', async () => {
    const response = await request(server)
      .post('/api/users/login').set('Origin', origin)
      .key(options.key)
      .cert(options.cert)
      .send({
        dni: nonexistentUser.dni,
        password: nonexistentUser.password,
        personalPhoneId: nonexistentUser.personalPhoneId
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({
      errors: [{
        msg: 'El usuario no está registrado.'
      }]
    })
  })
  test('debería responder con un código de estado 401 - POST /api/users - El usuario intenta registrar un nuevo usuario sin haberse autenticado.', async () => {
    const response = await request(server).post('/api/users').set('Origin', origin)
      .key(options.key)
      .cert(options.cert).send({
        dni: studenUser.dni,
        password: studenPassword,
        name: studenUser.name,
        email: studenUser.email,
        rol: 'Estudiante'
      })
      .disableTLSCerts()
    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      errors: [{
        msg: 'No se encuentra autenticado.'
      }]
    })
  })

  /* test('debería responder con un código de estado 401 - POST /api/users/login - El usuario realiza su primer inicio de sesión.', async () => {
    const response = await request(server).post('/api/users/login').set('Origin', origin)
      .key(options.key)
      .cert(options.cert).send({
      dni: adminUser.dni,
      password: adminPassword,
      personalPhoneId: infoAdminUser.personalPhoneId
    })
      .disableTLSCerts()
    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      errors: [{
        msg: 'Debe cambiar su contraseña.'
      }]
    })
  }) */

  test('deberia responder con un codigo de estado 200 - POST /api/users/login - El usuario se loguea con éxito', async () => {
    infoAdminUser.isFirstLogin = false
    await infoAdminUser.save()

    const response = await request(server).post('/api/users/login').set('Origin', origin)
      .key(options.key)
      .cert(options.cert).send({
        dni: adminUser.dni,
        password: adminPassword,
        personalPhoneId: infoAdminUser.personalPhoneId
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
    tokenSessionAdmin = response.body.token
  })

  test('debería responder con un código de estado 403 - POST /api/users -  El usuario se loguea con éxito e intente guardar un usuario sin tener el rol asignado', async () => {
    infoStudenUser.isFirstLogin = false
    await infoStudenUser.save()
    let response = await request(server).post('/api/users/login').set('Origin', origin)
      .key(options.key)
      .cert(options.cert).send({
        dni: studenUser.dni,
        password: studenPassword,
        personalPhoneId: infoStudenUser.personalPhoneId
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)

    tokenSessionStudent = response.body.token

    response = await request(server).post('/api/users').set('Origin', origin)
      .set('Authorization', `Bearer ${tokenSessionStudent}`)
      .key(options.key)
      .cert(options.cert).send({
        dni: studenUser.dni,
        password: studenPassword,
        name: studenUser.name,
        email: studenUser.email,
        rol: 'Estudiante'
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(403)
    expect(response.body).toEqual({
      errors: [
        {
          msg: 'Acceso denegado.'
        }
      ]
    })
  })

  test('debería responder con un código de estado 409 - POST /api/users -  El usuario se loguea con éxito e intente guardar un usuario existente', async () => {
    let response = await request(server).post('/api/users/login').set('Origin', origin)
      .key(options.key)
      .cert(options.cert).send({
        dni: adminUser.dni,
        password: adminPassword,
        personalPhoneId: infoAdminUser.personalPhoneId
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)

    tokenSessionAdmin = response.body.token

    response = await request(server).post('/api/users').set('Origin', origin)
      .set('Authorization', `Bearer ${tokenSessionAdmin}`)
      .key(options.key)
      .cert(options.cert).send({
        dni: studenUser.dni,
        password: studenPassword,
        name: studenUser.name,
        email: studenUser.email,
        rol: 'Estudiante'
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(409)
    expect(response.body).toEqual({
      errors: [
        {
          msg: 'El usuario ya se encuentra registrado.'
        }
      ]
    })
  })

  test('debería responder con un código de estado 200 - POST /api/users - El usuario se loguea con éxito y guardada el registro del nuevo usuario', async () => {
    let response = await request(server).post('/api/users/login').set('Origin', origin)
      .key(options.key)
      .cert(options.cert).send({
        dni: adminUser.dni,
        password: adminPassword,
        personalPhoneId: infoAdminUser.personalPhoneId
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)

    tokenSessionAdmin = response.body.token

    response = await request(server).post('/api/users').set('Origin', origin)
      .set('Authorization', `Bearer ${tokenSessionAdmin}`)
      .key(options.key)
      .cert(options.cert).send({
        dni: newUser.dni,
        password: newUser.password,
        name: newUser.name,
        email: newUser.email,
        rol: 'Estudiante'
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      msg: 'Usuario almacenado correctamente, Llegará un email a su casilla de correo.'
    })
  })
})

// ------------------------------------------------------------------------------------------------------------------

/*
  Describe - El intento de un usuario para pedir el restablecimiento de su contraseña.
  ✔️  El usuario falla en el intento del pedido de restablecimiento - Res: El usuario no está registrado.
  ✔️  El usuario ha tenido éxito en el pedido del restablecimiento - Res: Se ha enviado un email para el cambio de contraseña.
  ✔️  El usuario falla en el intento de envío del código de recuperación
  ✔️  El usuario falla en el intento del cambio de contraseña - Res: El código de recuperación no es válido.
  ✔️  El usuario cambia con éxito su contraseña - Res: Contraseña modificada con éxito.
*/
describe('Describe - El intento de un usuario para pedir el restablecimiento de su contraseña', () => {
  test('deberia responder con un código de estado 401 - POST /api/users/reset-password - El usuario falla en el intento del pedido de restablecimiento', async () => {
    const response = await request(server).post('/api/users/reset-password').set('Origin', origin)
      .key(options.key)
      .cert(options.cert).send({
        dni: nonexistentUser.dni
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({
      errors: [{
        msg: 'El usuario no está registrado.'
      }]
    })
  })
  test('deberia responder con un código de estado 200 - POST /api/users/reset-password - El usuario ha tenido éxito en el pedido del restablecimiento', async () => {
    const response = await request(server)
      .post('/api/users/reset-password').set('Origin', origin)
      .key(options.key)
      .cert(options.cert)
      .send({
        dni: studenUser.dni
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      msg: 'Se ha enviado un email para el cambio de contraseña.'
    })
  })

  const tokenRecover = '1234'
  test('deberia responder con un código de estado 401 - POST /api/users/verificar-token - El usuario falla en el intento de envío del código de recuperación', async () => {
    infoStudenUser.recoverytoken = tokenRecover
    await infoStudenUser.save()
    const response = await request(server)
      .post('/api/users/verificar-token').set('Origin', origin)
      .key(options.key)
      .cert(options.cert)
      .send({
        token: '123428',
        dni: studenUser.dni
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({
      errors: [{
        msg: 'El código de recuperación no es válido.'
      }]
    })
  })
  test('deberia responder con un código de estado 401 - POST /api/users/reset-password/:token - El usuario falla en el intento del cambio de contraseña', async () => {
    const response = await request(server)
      .post('/api/users/reset-password/111111').set('Origin', origin)
      .key(options.key)
      .cert(options.cert)
      .send({
        dni: studenUser.dni,
        password: studenPassword
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({
      errors: [{
        msg: 'El código de recuperación no es válido.'
      }]
    })
  })
  test('deberia responder con un código de estado 200 - POST /api/users/reset-password/:token - El usuario cambia con éxito su contraseña', async () => {
    const response = await request(server)
      .post(`/api/users/reset-password/${tokenRecover}`).set('Origin', origin)
      .key(options.key)
      .cert(options.cert)
      .send({
        password: studenPassword,
        dni: studenUser.dni
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      msg: 'Contraseña modificada con éxito.'
    })
  })
})

// ------------------------------------------------------------------------------------------------------------------

/*
  Describe - El intento de un usuario para pedir el restablecimiento su dispositivo mobile.
  ✔️  El usuario falla en el intento del pedido de restablecimiento - Res: No se encuentra autenticado.
  ✔️  El usuario ha tenido éxito en el pedido del restablecimiento - Res: Se ha enviado un email para el cambio de su dispositivo.
  ✔️  El usuario falla en el intento de envío del código de recuperación - Res: El código de recuperación no es válido.
  ✔️  El usuario falla en el intento del cambio de dispositivo - Res: Ya existe un usuario utilizando el dispositivo.
  ✔️  El usuario cambia con éxito su dispositivo - Res: El dispositivo mobile ha sido cambiado con éxito.
*/
describe('Describe - El intento de un usuario para pedir el restablecimiento su dispositivo mobile', () => {
  test('deberia responder con un código de estado 401 - POST /api/users/reset-mobile-id - El usuario falla en el intento del pedido de restablecimiento', async () => {
    const response = await request(server).post('/api/users/reset-mobile-id').set('Origin', origin)
      .key(options.key)
      .cert(options.cert).send({
      })
      .disableTLSCerts()
    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      errors: [{
        msg: 'No se encuentra autenticado.'
      }]
    })
  })
  test('deberia responder con un código de estado 200 - POST /api/users/reset-mobile-id - El usuario ha tenido éxito en el pedido del restablecimiento', async () => {
    let response = await request(server).post('/api/users/login').set('Origin', origin)
      .key(options.key)
      .cert(options.cert).send({
        dni: studenUser.dni,
        password: studenPassword,
        personalPhoneId: infoStudenUser.personalPhoneId
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)

    tokenSessionStudent = response.body.token

    response = await request(server).post('/api/users/reset-mobile-id').set('Origin', origin)
      .set('Authorization', `Bearer ${tokenSessionStudent}`)
      .key(options.key)
      .cert(options.cert).send({
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      msg: 'Se ha enviado un email para el cambio de su dispositivo.'
    })
  })
  const tokenRecoverMob = '1234'

  test('deberia responder con un código de estado 401 - POST /api/users/reset-mobile-id/:token - El usuario falla en el intento de envío del código de recuperación', async () => {
    infoStudenUser.recoverytokenmobile = tokenRecoverMob
    await infoStudenUser.save()
    const response = await request(server)
      .post('/api/users/reset-mobile-id/111111').set('Authorization', `Bearer ${tokenSessionStudent}`).set('Origin', origin)
      .key(options.key)
      .cert(options.cert)
      .send({
        personalPhoneId: '867790'
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({
      errors: [{
        msg: 'El código de recuperación no es válido.'
      }]
    })
  })
  const personalPhoneId = '987123'
  test('deberia responder con un código de estado 409 - POST /api/users/reset-mobile-id/:token - El usuario falla en el intento del cambio de dispositivo', async () => {
    infoStudenUser.recoverytokenmobile = tokenRecoverMob
    await infoStudenUser.save()
    const response = await request(server)
      .post(`/api/users/reset-mobile-id/${tokenRecoverMob}`).set('Origin', origin).set('Authorization', `Bearer ${tokenSessionStudent}`)
      .key(options.key)
      .cert(options.cert)
      .send({
        personalPhoneId
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(409)
    expect(response.body).toEqual({
      errors: [{
        msg: 'Ya existe un usuario utilizando el dispositivo.'
      }]
    })
  })
  test('deberia responder con un código de estado 200 - POST /api/users/reset-mobile-id/:token - El usuario cambia con éxito su dispositivo', async () => {
    infoStudenUser.recoverytokenmobile = tokenRecoverMob
    await infoStudenUser.save()
    const response = await request(server)
      .post(`/api/users/reset-mobile-id/${tokenRecoverMob}`).set('Origin', origin).set('Authorization', `Bearer ${tokenSessionStudent}`)
      .key(options.key)
      .cert(options.cert)
      .send({
        personalPhoneId: personalPhoneId + '1'
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      msg: 'El dispositivo mobile ha sido cambiado con éxito.'
    })
  })
})

/** *------------------------------------------------------------------------------------------------------ */
/*
  Describe - El servicio de prueba para la consulta del Perfil.
  ✔️  El usuario consulta su perfil mediante su autenticación
*/
describe('Describe - El servicio de prueba para la consulta del Perfil - GET /api/users/sin-permisos/profile', () => {
  test('deberia responder con un codigo de estado 200 - El usuario consulta su perfil mediante su autenticación', async () => {
    const response = await request(server).get('/api/users/profile').set('Origin', origin).set('Authorization', `Bearer ${tokenSessionStudent}`)
      .key(options.key)
      .cert(options.cert).send()
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
  })
})
describe('Describe - El servicio para la consulta del perfil solo para Administradores - GET /api/admin/profile', () => {
  test('deberia responder con un codigo de estado 200 - El usuario consulta su perfil mediante su autenticación', async () => {
    let response = await request(server).post('/api/users/login').set('Origin', origin)
      .key(options.key)
      .cert(options.cert).send({
        dni: 11111111,
        password: 123456789,
        personalPhoneId: '987123'
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
    const token2 = response.body.token
    response = await request(server).get('/api/admin/profile').set('Origin', origin).set('Authorization', `Bearer ${token2}`)
      .key(options.key)
      .cert(options.cert).send()
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
  })
})
describe('Describe - El servicio para la consulta de las materias - carreras - depártamento para la gestion solo para Administradores - GET /api/admin/professorship', () => {
  test('deberia responder con un codigo de estado 200 - El usuario consulta las materias - carreras - depártamento', async () => {
    let response = await request(server).post('/api/users/login').set('Origin', origin)
      .key(options.key)
      .cert(options.cert).send({
        dni: 11111111,
        password: 123456789,
        personalPhoneId: 'asdagd24'
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
    response = await request(server).get('/api/admin/professorships').set('Origin', origin).set('Authorization', `Bearer ${response.body.token}`)
      .key(options.key)
      .cert(options.cert).send()
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
  })
})

describe('Describe - El servicio para la consulta del perfil solo para Bedel - GET /api/bedels/profile', () => {
  test('deberia responder con un codigo de estado 200 - El usuario consulta su perfil mediante su autenticación', async () => {
    const bedel = await User.findOne({ dni: 22222222 })
    const bedelPassword = '123456789'
    const infoBedelUser = await Infouser.findById(bedel.infouser)
    infoBedelUser.isFirstLogin = false
    infoBedelUser.personalPhoneId = '987123'
    await infoBedelUser.save()

    let response = await request(server).post('/api/users/login').set('Origin', origin)
      .key(options.key)
      .cert(options.cert).send({
        dni: bedel.dni,
        password: bedelPassword,
        personalPhoneId: '987123'
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
    response = await request(server).get('/api/bedels/profile').set('Origin', origin).set('Authorization', `Bearer ${response.body.token}`)
      .key(options.key)
      .cert(options.cert).send()
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
  })
})

describe('Describe - El servicio para la consulta de las materias - carreras - depártamento para la gestion solo para Bedel - GET /api/bedels/professorship', () => {
  test('deberia responder con un codigo de estado 200 - El usuario consulta las materias - carreras - depártamento', async () => {
    let response = await request(server).post('/api/users/login').set('Origin', origin)
      .key(options.key)
      .cert(options.cert).send({
        dni: 22222222,
        password: '123456789',
        personalPhoneId: '987123'
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)

    response = await request(server).get('/api/bedels/professorships').set('Origin', origin).set('Authorization', `Bearer ${response.body.token}`)
      .key(options.key)
      .cert(options.cert).send()
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
  })
})

describe('Describe - El servicio de prueba para la consulta del perfil solo para Profesores - GET /api/profesors/profile', () => {
  test('deberia responder con un codigo de estado 200 - El usuario consulta su perfil mediante su autenticación', async () => {
    let response = await request(server).post('/api/users/login').set('Origin', origin)
      .key(options.key)
      .cert(options.cert).send({
        dni: 33333333,
        password: 123456789,
        personalPhoneId: '987123'
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
    response = await request(server).get('/api/professors/profile').set('Origin', origin).set('Authorization', `Bearer ${response.body.token}`)
      .key(options.key)
      .cert(options.cert).send()
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
  })
})
describe('Describe - El servicio para la consulta de las materias - carreras - depártamento que tiene asignados para su gestión solo para Profesores - GET /api/professors/professorship', () => {
  test('deberia responder con un codigo de estado 200 - El usuario consulta las materias - carreras - depártamento', async () => {
    let response = await request(server).post('/api/users/login').set('Origin', origin)
      .key(options.key)
      .cert(options.cert).send({
        dni: 33333333,
        password: 123456789,
        personalPhoneId: '987123'
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
    response = await request(server).get('/api/professors/professorships').set('Origin', origin).set('Authorization', `Bearer ${response.body.token}`)
      .key(options.key)
      .cert(options.cert).send()
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
  })
})
describe('Describe - El servicio de prueba para la consulta del perfil solo para Estudiantes - GET /api/students/profile', () => {
  test('deberia responder con un codigo de estado 200 - El usuario consulta su perfil mediante su autenticación', async () => {
    const response = await request(server).get('/api/students/profile').set('Origin', origin).set('Authorization', `Bearer ${tokenSessionStudent}`)
      .key(options.key)
      .cert(options.cert).send()
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
  })
})
describe('Describe - El servicio de prueba para la consulta de las materias - carreras - depártamento que tiene asignados para su gestión solo para Estudiantes - GET /api/students/profile', () => {
  test('deberia responder con un codigo de estado 200 - El usuario consulta su perfil mediante su autenticación', async () => {
    let response = await request(server).post('/api/users/login').set('Origin', origin)
      .key(options.key)
      .cert(options.cert).send({
        dni: 10000002,
        password: 123456789,
        personalPhoneId: '987123'
      })
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
    response = await request(server).get('/api/students/professorships').set('Origin', origin).set('Authorization', `Bearer ${response.body.token}`)
      .key(options.key)
      .cert(options.cert).send()
      .disableTLSCerts()
    expect(response.statusCode).toBe(200)
  })
})
