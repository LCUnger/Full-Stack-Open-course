import mongoose from 'mongoose'
import type { Document, Schema } from 'mongoose'

import type { DbBlogType, BlogType, BlogJsonType } from '../types/blog.types'

mongoose.set('strictQuery', false)

const blogSchema: Schema<DbBlogType> = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    }
})

blogSchema.set('toJSON', {
  transform: (document, _returnedObject) => {
    const { _id, __v, ...rest } = document.toObject()
    const obj: BlogJsonType = { id: _id.toString(), ...rest }
    return obj
  },
});

const Blog = mongoose.model<DbBlogType>('Blog', blogSchema)

export default Blog
