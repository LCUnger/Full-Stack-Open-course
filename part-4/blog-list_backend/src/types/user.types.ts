import mongoose, { Document } from "mongoose"
import { BlogType } from "./blog.types"

export interface UserEntryType {
  username: string,
  password: string,
  name: string,
}

export interface UserType {
  username: string
  passwordHash: string
  name: string
  blogs: mongoose.Types.ObjectId[]
}

export interface UserJsonType {
  username: string
  name: string
  id: string
}

export interface PopulatedUserType extends Omit<UserType, 'blogs'> {
  blogs: BlogType[]
}

export interface DbUserType extends UserType, Document {
  _id: mongoose.Types.ObjectId
}