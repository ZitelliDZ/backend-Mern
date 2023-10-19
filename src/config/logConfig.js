import winston from 'winston'
import WinstonMongoDB from 'winston-mongodb'
import expressWinston from 'express-winston'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import mongoose from 'mongoose'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Configuración de los logs de Winston
const logConfigCustom = (code) => winston.createLogger({
  level: 'error',
  storeHost: true,
  capped: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.prettyPrint(),
    winston.format.json()
  ),
  transports: [
    new WinstonMongoDB.MongoDB({
      db: mongoose.connection,
      level: 'error',
      collection: `Error-${code}`,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.metadata(),
        winston.format.errors({ stack: true }),
        winston.format.prettyPrint(),
        winston.format.json()
      )
    })
  ],
  meta: true
})

const logConfig = (path) => expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: `${join(__dirname, path)}`,
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.prettyPrint(),
        winston.format.json()
      )
    })
  ]
})

// Creacion del log Winston
const loggerCustom500 = logConfigCustom('500')
const loggerCustom400 = logConfigCustom('400')
const logger = logConfig('../logs/error.log')

export {
  loggerCustom500,
  loggerCustom400,
  logger
}
