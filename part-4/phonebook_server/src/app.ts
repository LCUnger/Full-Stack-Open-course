import express from 'express'
import mongoose from 'mongoose'

import config from './utils/config'
import logger from './utils/logger'
import middleware from './utils/middleware'

import contactsRouter from './controllers/contacts'

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to mongoDB')
  })
  .catch((error: Error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/contacts', contactsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app