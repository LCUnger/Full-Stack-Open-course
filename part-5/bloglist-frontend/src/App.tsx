import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs.service'
import type { BlogType } from './types/blog.types'

const App = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    fetchBlogs()
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App