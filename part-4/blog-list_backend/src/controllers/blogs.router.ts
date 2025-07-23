import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import type { DbBlogType } from '../types/blog.types'
import type { RequestWithToken, TokenPayload } from '../types/token.types'

import User from '../models/user.model'
import Blog from '../models/blog.model'
import config from '../utils/config'
import { BackEndError } from '../utils/middleware'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response: Response<DbBlogType[]>, next: NextFunction) => {
  try {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

const verifyToken = async (request: Request) => {
  const token = (request as RequestWithToken).token;

  if (!token) throw new BackEndError('token missing or invalid scheme', 401);

  const decodedToken = jwt.verify(token, config.SECRET_KEY) as TokenPayload;

  if (!decodedToken.id) throw new BackEndError('token invalid', 401);

  const user = await User.findById(decodedToken.id);

  if (!user) throw new BackEndError('UserId missing or invalid', 400);
  
  return user;
};

blogsRouter.post('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const blogBody = request.body


    const user = await verifyToken(request)

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
    const blogId = request.params.id
    const user = await verifyToken(request)

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

export default blogsRouter