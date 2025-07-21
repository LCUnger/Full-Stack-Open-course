import mongoose from "mongoose";

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

export interface DbBlogType extends BlogType, Document {}