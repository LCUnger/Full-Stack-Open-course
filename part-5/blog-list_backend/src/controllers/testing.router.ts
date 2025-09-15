import express, { Request, Response, NextFunction } from 'express'
import Blog from '../models/blog.model'
import User from '../models/user.model'
import type { BlogType } from '../types/blog.types'
import type { RequestWithUser } from '../types/request.types'

const testingRouter = express.Router()

testingRouter.post('/reset', async (_request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

testingRouter.post('/upload', async (request: Request<{}, BlogType[]>, response, next) => {
try {
    const blogsBody = request.body
    
    const user = (request as RequestWithUser).user

    const savedBlogs = []

    for (const blogBody of blogsBody) {
      const blog = new Blog({
      ...blogBody, 
      user: user._id})

      const savedBlog = await blog.save()
      savedBlogs.push(savedBlog)

      user.blogs = user.blogs.concat([savedBlog._id])
      await user.save()
    }

    response.status(201).json(savedBlogs)
  } catch (error) {
    next(error)
  }
})

export default testingRouter