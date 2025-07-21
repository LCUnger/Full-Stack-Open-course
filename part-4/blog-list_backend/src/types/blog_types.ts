import mongoose from "mongoose";
import { UserType } from "./user_types";

export interface BlogEntryType {
  title: string;
  author: string;
  url: string;
  likes?: number;
}

export interface BlogType {
  title: string;
  author: string;
  url: string;
  likes: number;
  id?: string;
  user: mongoose.Types.ObjectId
}

export interface PopulatedBlogType extends Omit<BlogType, 'user'> {
  user: UserType
}

export interface DbBlogType extends BlogType, Document {}