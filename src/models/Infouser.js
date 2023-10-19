import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import generateJWT from '../helpers/generateJWT.js'
import { generateRandomNumber } from '../helpers/generateId.js'

// Crea el esquema de Información para el usuario
const infouserSchema = mongoose.Schema(
  {
    sessiontoken: {
      type: String,
      required: false,
      default: null
    },
    expiretoken: {
      type: Date,
      required: false,
      default: null
    },
    recoverytoken: {
      type: String,
      required: false,
      default: null
    },
    pin: {
      type: String,
      required: false,
      default: null
    },
    personalPhoneId: {
      type: String,
      required: false,
      default: null
    },
    isFirstLogin: {
      type: Boolean,
      required: false,
      default: true
    },
    recoverytokenmobile: {
      type: String,
      required: false,
      default: null
    },
    recoverytokenpin: {
      type: String,
      required: false,
      default: null
    }
  },
  {
    timestamps: true
  }
)

infouserSchema.methods.createSessionUser = async function (user) {
  const sessionToken = await generateJWT(user._id)
  this.sessiontoken = sessionToken
  const currDate = Date.now()
  const dt = new Date(currDate)
  this.recoverytoken = ''
  this.expiretoken = new Date(dt.getTime() + (60 * 60 * 1000))
  return {
    info: await this.save(),
    token: sessionToken
  }
}
infouserSchema.methods.getPin = function () {
  return this.pin
}
infouserSchema.methods.getFirstLogin = function () {
  return this.isFirstLogin
}
infouserSchema.methods.setPin = async function (pin) {
  this.pin = pin
  this.recoverytokenpin = ''
  return await this.save()
}
infouserSchema.methods.changePassword = async function () {
  this.isFirstLogin = false
  this.recoverytoken = ''
  return await this.save()
}
infouserSchema.methods.generateRecoverytoken = async function () {
  const token = generateRandomNumber()
  this.recoverytoken = token
  const info = await this.save()
  return {
    info,
    token
  }
}
infouserSchema.methods.generateRecoverytokenmobile = async function () {
  const token = generateRandomNumber()
  this.recoverytokenmobile = token
  this.personalPhoneId = ''
  return {
    info: await this.save(),
    token
  }
}
infouserSchema.methods.generateRecoverytokenpin = async function () {
  const token = generateRandomNumber()
  this.recoverytokenpin = token
  this.pin = ''
  return {
    info: await this.save(),
    token
  }
}
infouserSchema.methods.changeMobile = async function (mobile) {
  this.personalPhoneId = mobile
  this.recoverytokenmobile = ''
  return await this.save()
}
infouserSchema.statics.createInfo = async function (sessiontoken, expiretoken, recoverytoken, personalPhoneId, isFirstLogin, recoverytokenmobile, pin) {
  const newInfo = new this({
    sessiontoken,
    expiretoken,
    recoverytoken,
    personalPhoneId,
    isFirstLogin,
    recoverytokenmobile,
    pin
  })
  return await newInfo.save()
}

infouserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)

  if (this.isModified('recoverytoken')) {
    if (this.recoverytoken && this.recoverytoken !== '' && this.recoverytoken !== null) {
      this.recoverytoken = await bcrypt.hash(this.recoverytoken, salt)
    }
  }

  if (this.isModified('pin')) {
    if (this.pin && this.pin !== '' && this.pin !== null) {
      this.pin = await bcrypt.hash(this.pin, salt)
    }
  }

  if (this.sessiontoken && this.isModified('sessiontoken') && this.sessiontoken !== null) {
    this.sessiontoken = await bcrypt.hash(this.sessiontoken.split('.')[1], salt)
  }

  if (this.personalPhoneId && this.isModified('personalPhoneId') && this.personalPhoneId !== null) {
    if (this.personalPhoneId !== '') {
      this.personalPhoneId = await bcrypt.hash(this.personalPhoneId, salt)
    }
  }
  if (this.recoverytokenmobile && this.isModified('recoverytokenmobile') && this.recoverytokenmobile !== null) {
    if (this.recoverytokenmobile !== '') {
      this.recoverytokenmobile = await bcrypt.hash(this.recoverytokenmobile, salt)
    }
  }
  if (this.recoverytokenpin && this.isModified('recoverytokenpin') && this.recoverytokenpin !== null) {
    if (this.recoverytokenpin !== '') {
      this.recoverytokenpin = await bcrypt.hash(this.recoverytokenpin, salt)
    }
  }
})

// Comprobar pin
infouserSchema.methods.verifyPin = async function (pin) {
  if (!pin || !this.pin) {
    return false
  }
  return await bcrypt.compare(pin, this.pin)
}

// Comprobar sessiontoken
infouserSchema.methods.verifySessionToken = async function (sessionTokenReq) {
  if (!sessionTokenReq.split('.')[1] || !this.sessiontoken) {
    return false
  }
  return await bcrypt.compare(sessionTokenReq.split('.')[1], this.sessiontoken)
}
// Comprobar recoverytoken
infouserSchema.methods.verifyRecoveryToken = async function (recoveryTokenReq) {
  if (!recoveryTokenReq || !this.recoverytoken) {
    return false
  }
  return await bcrypt.compare(recoveryTokenReq, this.recoverytoken)
}
// Comprobar recoverytokenmobile
infouserSchema.methods.verifyRecoveryTokenMobile = async function (recoveryTokenReq) {
  if (!recoveryTokenReq || !this.recoverytokenmobile) {
    return false
  }

  return await bcrypt.compare(recoveryTokenReq, this.recoverytokenmobile)
}
// Comprobar recoverytokenpin
infouserSchema.methods.verifyRecoveryTokenPin = async function (recoveryTokenReq) {
  if (!recoveryTokenReq || !this.recoverytokenpin) {
    return false
  }
  return await bcrypt.compare(recoveryTokenReq, this.recoverytokenpin)
}
// Comprobar personalPhoneId
infouserSchema.methods.verifyMobile = async function (mobileidReq) {
  if (!mobileidReq || !this.personalPhoneId) {
    return false
  }
  return await bcrypt.compare(mobileidReq, this.personalPhoneId)
}

// Comprobar tokensession Expiracion
infouserSchema.methods.verifyExpireToken = function () {
  const currDate = Date.now()
  const dt = new Date(currDate)
  return dt > this.expiretoken
}

const Infouser = mongoose.model('Infouser', infouserSchema)
export default Infouser

// SUAGGER

/**
 *  @swagger
 *  components:
 *  schemas:
 *    Infouser:
 *      type: object
 *      properties:
 *        sessiontoken:
 *          type: String
 *          required: false
 *          default: null
 *        expiretoken:
 *          type: Date
 *          required: false
 *          default: null
 *        recoverytoken:
 *          type: String
 *          required: false
 *          default: null
 *        recoverytokenmobile:
 *          type: String
 *          required: false
 *          default: null
 *        isFirstLogin:
 *          type: String
 *          required: false
 *          default: true
 *        personalPhoneId:
 *          type: String
 *          required: false
 *          default: null
 *        timestamps:
 *          type: Date
 *          descripción: modelo con los atributos "createdAt" y "updatedAt"
 *      example:
 *        sessiontoken: Hash
 *        expiretoken:  Hash
 *        recoverytoken:  Hash
 *        recoverytokenmobile:  Hash
 *        isFirstLogin: true
 *        personalPhoneId: Hash
 */
