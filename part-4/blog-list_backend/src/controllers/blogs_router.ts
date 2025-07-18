import express, { Request, Response, NextFunction } from 'express'
import type { BlogType } from '../types/blog'
import type { DbBlogType } from '../types/blog'

import Blog from '../models/blog_model'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response: Response<DbBlogType[]>) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', (request: Request<{}, {}, BlogType>, response: Response, next: NextFunction) => {
  const blog = new Blog(request.body)

  blog.save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((error) => next(error))
})

export default blogsRouter