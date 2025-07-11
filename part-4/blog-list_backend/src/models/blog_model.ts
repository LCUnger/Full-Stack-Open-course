import mongoose from 'mongoose'
import type { Document, Schema } from 'mongoose'

mongoose.set('strictQuery', false)

export interface BlogType {
  title: string;
  author: string;
  url: string;
  likes: number;
}

export interface DbBlogType extends BlogType, Document {}


const blogSchema: Schema<DbBlogType> = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model<DbBlogType>('Blog', blogSchema)

export default Blog
