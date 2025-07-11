import mongoose from 'mongoose'
import type { Document, Schema } from 'mongoose'

import type { DbBlogType } from '../types/blog'

mongoose.set('strictQuery', false)

const blogSchema: Schema<DbBlogType> = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model<DbBlogType>('Blog', blogSchema)

export default Blog
