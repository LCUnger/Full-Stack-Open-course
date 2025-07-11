import type { BlogType } from "../types/blog"

const dummy = (blogs: BlogType[]) => {
  return 1
}

const totalLikes = (blogs: BlogType[]) => {
  return blogs.reduce((sum, val) => sum + val.likes, 0)
}

const favoriteBlog = (blogs: BlogType[]): BlogType => {
  if (blogs.length === 0) {
    throw new Error("No blogs available");
  }

  return blogs.reduce((favorite, blog) => 
    blog.likes > favorite.likes ? blog : favorite
  );
}

export default { dummy, totalLikes, favoriteBlog }