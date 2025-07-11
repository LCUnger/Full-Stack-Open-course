import express, { Request, Response, NextFunction } from 'express'
import type { BlogType } from '../models/blog_model'

import Blog from '../models/blog_model'

const blogsRouter = express.Router()

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
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