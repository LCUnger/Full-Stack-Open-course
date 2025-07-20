import mongoose from 'mongoose'
import type { Document, Schema } from 'mongoose'

import type { DbBlogType, BlogType } from '../types/blog_types'

mongoose.set('strictQuery', false)

const blogSchema: Schema<DbBlogType> = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject: BlogType & { _id?: mongoose.Types.ObjectId, __v?: number}) => {
    returnedObject.id = returnedObject._id!.toString(); // Convert _id to id
    delete returnedObject._id; // Remove _id
    delete returnedObject.__v; // Remove __v
  },
});

const Blog = mongoose.model<DbBlogType>('Blog', blogSchema)

export default Blog
