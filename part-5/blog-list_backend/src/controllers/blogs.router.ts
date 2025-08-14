import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import type { BlogType, DbBlogType } from '../types/blog.types'
import type { TokenPayload } from '../types/token.types'

import User from '../models/user.model'
import Blog from '../models/blog.model'
import config from '../utils/config'
import middleware, { BackEndError } from '../utils/middleware'
import { RequestWithUser } from '../types/request.types'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response: Response<DbBlogType[]>, next: NextFunction) => {
  try {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', middleware.tokenHandler, async (request: Request, response: Response, next: NextFunction) => {
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

blogsRouter.put('/:id', async (request: Request<{id: string}, {}, BlogType>, response: Response<DbBlogType>, next: NextFunction) => {
  try {
    const blogId = request.params.id
    const blogBody = request.body

    // Validate that the blog exists
    const existingBlog = await Blog.findById(blogId)
    if (!existingBlog) {
      throw new BackEndError('Blog not found', 404)
    }

    // Update and return the updated blog with populated user data
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId, 
      blogBody, 
      { 
        new: true,  // Return the updated document
        runValidators: true  // Run mongoose validators
      }
    ).populate('user', { username: 1, name: 1 })

    if (!updatedBlog) {
      throw new BackEndError('Failed to update blog', 500)
    }

    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

export default blogsRouter