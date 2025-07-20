import blogsRouter from "../controllers/blogs_router"
import type { BlogType } from "../types/blog_types"
import ld from 'lodash'

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

const mostBlogs = (blogs: BlogType[]): { author: string, blogs: number } => {
  const blogsPerAuthor = ld.countBy(blogs, 'author')
  const authorWithMostBlogs = ld.maxBy(Object.entries(blogsPerAuthor), ([author, count]) => count);

  if (!authorWithMostBlogs) {
    return { author: '', blogs: 0 };
  }

  return { author: authorWithMostBlogs[0], blogs: authorWithMostBlogs[1] };
}

const mostLikes = (blogs: BlogType[]): { author: string, likes: number } => {
  const blogsGrouped = ld.groupBy(blogs, 'author')
  const likesPerAuthor = ld.mapValues(blogsGrouped, (authorsBlogs) => authorsBlogs.reduce((sum, blog) => sum + blog.likes, 0))
  const authorWithMostLikes = ld.maxBy(Object.entries(likesPerAuthor), ([, likes]) => likes)

  if (!authorWithMostLikes) {
    return {author: '', likes: 0}
  }

  return { author: authorWithMostLikes[0], likes: authorWithMostLikes[1]}
}

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }