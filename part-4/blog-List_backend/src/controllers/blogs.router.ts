import express, { Request, Response, NextFunction } from 'express'
import type { BlogEntryType, BlogType } from '../types/blog.types'
import type { DbBlogType } from '../types/blog.types'

import User from '../models/user.model'
import Blog from '../models/blog.model'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response: Response<DbBlogType[]>, next: NextFunction) => {
  try {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request: Request<{}, {}, BlogEntryType>, response: Response, next: NextFunction) => {
  try {
    const blogBody = request.body
    const user = (await User.find({}))[0]

    if (!user) {
      return response.status(400).json({ error: 'missing user' }) //Edit message when specific user is searched.
    }

    const blog = new Blog({
      ...blogBody, 
      user: user._id})

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

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