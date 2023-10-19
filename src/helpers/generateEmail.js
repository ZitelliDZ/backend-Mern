import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Email que se envía al usuario luego de registrar la cuenta al sistema
const firstLoginEmail = async (datos) => {
  const { dni, email, name, token } = datos

  await transporter.sendMail({
    from: '"Sistema Asistencia UGD - Administrador" <admin@asistencia.ugd.com>',
    to: email,
    subject: 'Sistema Asistencia UGD - Primer Inicio de sessión',
    text: '<p>Accede a tu cuenta del Sistema de Asistencia UGD</p>',
    html: ` <p>Hola ${name} has accedido por primera vez a tu cuenta</p>
    <p>Utiliza el siguiente código para poder almacenar los datos iniciales: <strong>${token}</strong></p>
    <p>Recuerde que su usuario es - dni: <strong>${dni}</strong></p>
    <p>Si tu no has iniciado sessión te pedimos que cambies tu contraseña.</p>
    `
  })
}

// Email que se envía al usuario luego de registrar la cuenta al sistema
const registrationEmail = async (datos) => {
  const { dni, email, name, password } = datos

  await transporter.sendMail({
    from: '"Sistema Asistencia UGD - Administrador" <admin@asistencia.ugd.com>',
    to: email,
    subject: 'Sistema Asistencia UGD - Comprueba tu cuenta',
    text: '<p>Accede a tu cuenta del Sistema de Asistencia UGD</p>',
    html: ` <p>Hola ${name} Accede a tu cuenta y cambia los datos de inicio de sesión</p>
            <p>Usuario: <strong>${dni}</strong></p>
            <p>Email: ${email}</p>
            <p>Contraseña: <strong>${password}</strong></p>
            <p>Nombre: ${name}</p>
      `
  })
}

// Email que se le envía al usuario luego de que haya pedido el restablecimiento de contraseña
const passwordResetEmail = async (datos) => {
  const { dni, email, name, token } = datos

  await transporter.sendMail({
    from: '"Sistema Asistencia UGD - Administrador" <admin@asistencia.ugd.com>',
    to: email,
    subject: 'Sistema Asistencia UGD - Has Olvidado tu Contraseña',
    text: '<p>Restablece tu Contraseña</p>',
    html: ` <p>Hola ${name} has pedido restablecer tu contraseña</p>
            <p>Utiliza el siguiente código para el proceso de restablecimiento: <strong>${token}</strong></p>
            <p>Recuerde que su usuario es - dni: <strong>${dni}</strong></p>
            <p>Si tu no has realizado el pedido de restablecimiento, puedes ignorar el mensaje.</p>
      `
  })
}
// Email que se le envía al usuario luego de que haya pedido el restablecimiento su mobile
const mobileResetEmail = async (datos) => {
  const { dni, email, name, token } = datos

  await transporter.sendMail({
    from: '"Sistema Asistencia UGD - Administrador" <admin@asistencia.ugd.com>',
    to: email,
    subject: 'Sistema Asistencia UGD - Cambio de dispositivo Mobile',
    text: '<p>Cambio de dispositivo Mobile</p>',
    html: ` <p>Hola ${name} has pedido el cambio de tu dispositivo</p>
            <p>Utiliza el siguiente código para realizar el cambio: <strong>${token}</strong></p>
            <p>Recuerde que su usuario es - dni: <strong>${dni}</strong></p>
            <p>Si tu no has realizado el pedido de restablecimiento, puedes ignorar el mensaje.</p>
      `
  })
}

// Email que se le envía al usuario luego de que haya pedido el restablecimiento su pin
const pinResetEmail = async (datos) => {
  const { dni, email, name, token } = datos

  await transporter.sendMail({
    from: '"Sistema Asistencia UGD - Administrador" <admin@asistencia.ugd.com>',
    to: email,
    subject: 'Sistema Asistencia UGD - Cambio de Pin de seguridad',
    text: '<p>Cambio de pin de seguridad</p>',
    html: ` <p>Hola ${name} has pedido el cambio de tu pin</p>
            <p>Utiliza el siguiente código para realizar el cambio: <strong>${token}</strong></p>
            <p>Recuerde que su usuario es - dni: <strong>${dni}</strong></p>
            <p>Si tu no has realizado el pedido de restablecimiento, puedes ignorar el mensaje.</p>
      `
  })
}
export { registrationEmail, passwordResetEmail, mobileResetEmail, pinResetEmail, firstLoginEmail }

export default registrationEmail
