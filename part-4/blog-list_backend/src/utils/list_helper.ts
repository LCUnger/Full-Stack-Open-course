import blogsRouter from "../controllers/blogs_router"
import type { BlogType } from "../types/blog"
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


export default { dummy, totalLikes, favoriteBlog, mostBlogs }