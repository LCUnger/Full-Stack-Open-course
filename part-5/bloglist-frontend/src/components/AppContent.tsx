import { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs.service'
import type { BlogType } from '../types/blog.types'
import InlogField from './InlogField'
import { useAuth } from '../contexts/useAuthContext'
import CreateBlog from './CreateBlog'

const AppContent = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const fetchBlogs = async () => {
        try {
          const blogs = await blogService.getAll()
          setBlogs(blogs)
        } catch (error) {
          console.error('Failed to fetch blogs:', error)
        }
      }

      fetchBlogs()
    }
  }, [user])

  return (
    <>
      <InlogField/>
      {user && (
        <>
          <h2>Blogs</h2>
          <CreateBlog/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      )}
    </>
  )
}

export default AppContent