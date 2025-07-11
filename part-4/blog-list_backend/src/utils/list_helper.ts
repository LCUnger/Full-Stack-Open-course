import type { BlogType } from "../types/blog"

const dummy = (blogs: BlogType[]) => {
  return 1
}

const totalLikes = (blogs: BlogType[]) => {
  return blogs.reduce((sum, val) => sum + val.likes, 0)
}

export default { dummy, totalLikes }