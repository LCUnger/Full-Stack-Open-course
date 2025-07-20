import express from 'express'
import mongoose from 'mongoose'


import config from './utils/config'
import logger from './utils/logger'
import blogsRouter from './controllers/blogs_router'
import middleware from './utils/middleware'
import userRouter from './controllers/users_router'

const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to mongoDB')
  })
  .catch((error: Error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)


export default app