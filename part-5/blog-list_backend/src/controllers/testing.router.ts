import express, { Request, Response, NextFunction } from 'express'
import Blog from '../models/blog.model'
import User from '../models/user.model'

const testingRouter = express.Router()

testingRouter.post('/reset', async (_request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

export default testingRouter