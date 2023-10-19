import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import Rol from './Rol.js'
import Infouser from './Infouser.js'

// Crea el esquema de Usuario
const userSchema = mongoose.Schema(
  {
    dni: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v.toString().length === 8
        },
        message: 'El número debe tener exactamente 8 dígitos.'
      }
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    infouser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Infouser,
      required: true
    },
    roles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: Rol,
      required: true
    }],
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

userSchema.methods.setInfouser = async function (info) {
  this.infouser = info._id
  return await this.save()
}
userSchema.methods.changePassword = async function (password) {
  this.password = password
  return await this.save()
}
userSchema.methods.addRol = async function (rol) {
  this.roles.push(rol)
  return await this.save()
}
userSchema.statics.createUser = async function (dni, name, password, email, infouser, roles) {
  const newUser = new this({
    dni,
    name,
    password,
    email,
    infouser,
    roles
  })
  return await newUser.save()
}
// Antes de realizar el guardado de un usuario.. "pre." es un middleware de mongoose para ejecutar antes del (en este caso) save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
    return
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.getId = function () {
  return this._id
}
userSchema.methods.setName = async function (name) {
  this.name = name
  return await this.save()
}

userSchema.methods.getName = function () {
  return this.name
}
userSchema.methods.setEmail = async function (email) {
  this.email = email
  return await this.save()
}

userSchema.methods.getEmail = function () {
  return this.email
}
userSchema.methods.setDni = async function (dni) {
  this.dni = dni
  return await this.save()
}

userSchema.methods.getDni = function () {
  return this.dni
}
userSchema.methods.setInfouser = async function (infouser) {
  this.infouser = infouser
  return await this.save()
}

userSchema.methods.getInfouser = function () {
  return this.infouser
}
userSchema.methods.setRoles = async function (roles) {
  this.roles = roles
  return await this.save()
}

userSchema.methods.getRoles = function () {
  return this.roles
}
userSchema.methods.setDeleted = async function (isdeleted) {
  this.isDeleted = isdeleted
  return await this.save()
}

userSchema.methods.getDeleted = function () {
  return this.isDeleted
}
// Comprobar Password.. "methods." es una herramienta para crear funciones personalizadas del modelo
userSchema.methods.verifyPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password)
}

// Borrado logico de las cuentas
userSchema.pre('find', function () {
  this.where({ isDeleted: false })
})
userSchema.pre('findOne', function () {
  this.where({ isDeleted: false })
})

const User = mongoose.model('User', userSchema)
export default User

// SUAGGER

/**
 *  @swagger
 *  components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *          type: String
 *          required: true
 *          trim: true
 *        dni:
 *          type: Number
 *          required: true
 *        password:
 *          type: String
 *          required: true
 *          trim: true
 *        email:
 *          type: String
 *          required: true
 *          trim: true
 *        infouser:
 *          type: ObjectId
 *          required: true
 *          $ref: '#/components/schemas/Infouser'
 *        roles:
 *          type: array
 *          required: true
 *          items:
 *            $ref: '#/components/schemas/Rol'
 *        isDeleted:
 *          type: Boolean
 *          default: false
 *        timestamps:
 *          type: Date
 *          descripción: modelo con los atributos "createdAt" y "updatedAt"
 *      required:
 *        - name
 *        - dni
 *        - password
 *        - email
 *        - infouser
 *        - roles
 *      example:
 *        name: Diego Zitelli
 *        dni: 55555555
 *        password: ABCD1234
 *        email: example@gmail.es
 *        infouser: ObjectId
 *        roles: [ ObjectId ]
 */
