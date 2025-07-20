import express, { Request, Response, NextFunction } from 'express'
import type { BlogType } from '../types/blog_types'
import type { DbBlogType } from '../types/blog_types'

import Blog from '../models/blog_model'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response: Response<DbBlogType[]>, next: NextFunction) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request: Request<{}, {}, BlogType>, response: Response, next: NextFunction) => {
  try {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request: Request<{id: string}>, response: Response, next: NextFunction) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default blogsRouter