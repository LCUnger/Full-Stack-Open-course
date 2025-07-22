import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import type { BlogEntryType, BlogType } from '../types/blog.types'
import type { DbBlogType } from '../types/blog.types'

import User from '../models/user.model'
import Blog from '../models/blog.model'
import config from '../utils/config'
import { RequestWithToken, TokenPayload } from '../types/token.types'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response: Response<DbBlogType[]>, next: NextFunction) => {
  try {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const blogBody = request.body

    const token = (request as RequestWithToken).token

    if (!token) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const decodedToken = jwt.verify(token, config.SECRET_KEY) as TokenPayload

    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(400).json({ error: 'UserId missing or invalid' })
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