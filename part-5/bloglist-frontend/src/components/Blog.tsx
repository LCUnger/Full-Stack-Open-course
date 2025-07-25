import type { BlogType } from "../types/blog.types";

const Blog = ({blog}: {blog: BlogType}) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

export default Blog