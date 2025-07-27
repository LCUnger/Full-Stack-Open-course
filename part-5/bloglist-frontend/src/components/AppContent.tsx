import { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs.service'
import type { BlogType } from '../types/blog.types'
import InlogField from './InlogField'
import { useAuth } from '../contexts/useAuthContext'
import CreateBlog from './CreateBlog'
import useNotification from '../hooks/useNotification'
import Notification from './Notification'

const AppContent = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const { user } = useAuth()
  const { pushNotification, notification } = useNotification()

  useEffect(() => {
    if (user) {
      const fetchBlogs = async () => {
        try {
          const blogs = await blogService.getAll()
          setBlogs(blogs)
        } catch (error) {
          pushNotification('Failed to get blogs', true)
          console.error('Failed to fetch blogs:', error)
        }
      }

      fetchBlogs()
    }
  }, [user, pushNotification])

  return (
    <>
      <Notification message={notification.message} isError={notification.isError}/>
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