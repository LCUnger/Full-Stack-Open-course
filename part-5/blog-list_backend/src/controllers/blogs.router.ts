import express, { Request, Response, NextFunction } from 'express'

import type { BlogEntryType, BlogType, DbBlogType } from '../types/blog.types'

import Blog from '../models/blog.model'
import middleware, { BackEndError } from '../utils/middleware'
import { RequestWithUser } from '../types/request.types'
import { update } from 'lodash'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response: Response<DbBlogType[]>, next: NextFunction) => {
  try {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', middleware.tokenHandler, async (request: Request<{}, {}, BlogEntryType>, response: Response, next: NextFunction) => {
  try {
    const blogBody = request.body
    
    const user = (request as RequestWithUser).user

    const blog = new Blog({
      ...blogBody, 
      user: user._id})

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat([savedBlog._id])
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', middleware.tokenHandler, async (request: Request<{id: string}>, response: Response, next: NextFunction) => {
  try {
    const blogId = request.params.id
    const user = (request as unknown as RequestWithUser).user

    const blog = await Blog.findById(blogId)
    if (!blog) {
      throw new BackEndError('Blog not found', 404)
    }

    if (blog.user.toString() !== user._id.toString()) {
      throw new BackEndError('Not authorized to delete this blog', 403)
    }

    await Blog.findByIdAndDelete(blogId)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', middleware.tokenHandler, async (request: Request<{id: string}, {}, BlogType>, response: Response, next: NextFunction) => {
  try {
    const blogId = request.params.id
    const updatedBlog = request.body

    await Blog.findByIdAndUpdate(blogId, updatedBlog)
    response.status(200).json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

export default blogsRouter