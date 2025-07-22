import mongoose from 'mongoose'
import type { Document, Schema } from 'mongoose'

import type { DbBlogType, BlogType } from '../types/blog.types'

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
  transform: (document, returnedObject: BlogType & { _id?: mongoose.Types.ObjectId, __v?: number}) => {
    returnedObject.id = returnedObject._id!.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model<DbBlogType>('Blog', blogSchema)

export default Blog
