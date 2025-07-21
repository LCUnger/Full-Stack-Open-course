import mongoose from "mongoose"
import { BlogType } from "./blog_types"

export interface UserEntryType {
  username: string,
  password: string,
  name: string,
}

export interface UserType {
  username: string
  passwordHash?: string
  name: string
  id?: string
  blogs: mongoose.Types.ObjectId[]
}

export interface PopulatedUserType extends Omit<UserType, 'blogs'> {
  blogs: BlogType[]
}

export interface DbUserType extends UserType, Document {}