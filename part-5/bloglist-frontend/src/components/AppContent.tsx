import { useState, useEffect, useCallback, useRef } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs.service'
import type { BlogType } from '../types/blog.types'
import InlogField from './InlogField'
import { useAuth } from '../hooks/useAuth'
import CreateBlog from './CreateBlog'
import Notification from './Notification'
import { useNotification } from '../hooks/useNotification'
import Toggleable from './Toggleable'
import type  { ToggleableRef }  from './Toggleable'

const AppContent = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const { user } = useAuth()
  const { pushNotification, notification } = useNotification()
  const CreateBlogToggleRef = useRef<ToggleableRef>(null)

  const fetchBlogs = useCallback(async () => {
    if (user) {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (error) {
        pushNotification('Failed to get blogs', true)
        console.error('Failed to fetch blogs:', error)
      }
    }
  }, [user, pushNotification])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  const handleBlogCreated = () => {
    fetchBlogs()
    CreateBlogToggleRef.current?.hide()
  }

  return (
    <>
      <Notification message={notification.message} isError={notification.isError}/>
      <InlogField/>
      {user && (
        <>
          <h2>Blogs</h2>
          <Toggleable ref={CreateBlogToggleRef} buttonLabel='new blog'>
            <CreateBlog onBlogCreated={handleBlogCreated}/>
          </Toggleable>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      )}
    </>
  )
}

export default AppContent