import express from 'express'
import mongoose from 'mongoose'


import config from './utils/config'
import logger from './utils/logger'
import blogsRouter from './controllers/blogs.router'
import middleware from './utils/middleware'
import userRouter from './controllers/users.router'
import loginRouter from './controllers/login.router'
import testingRouter from './controllers/testing.router'

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

app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)


export default app