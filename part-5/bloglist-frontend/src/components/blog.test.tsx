import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import type { BlogType } from '../types/blog.types'
import NotificationProvider from '../contexts/NotificationContext'
import AuthProvider from '../contexts/AuthContext'

test('renders content', () => {
  const blog: BlogType = {
    title: "test blog 1",
    author: "test author",
    url: "test.example.com",
    likes: 7,
    id: "69",
    user: {
      _id: "345678",
      username: "Vitest_Tester",
      name: "Vitest"
    }
  }

  const { container } = render(
    <AuthProvider>
      <NotificationProvider>
        <Blog blog={blog} onBlogRemoved={() => {console.log('remove blog...temp')}} />
      </NotificationProvider>
    </AuthProvider>
  )

  const blogElement = container.querySelector('.blog')

  expect(blogElement).toBeTruthy()

  expect(blogElement?.textContent).toContain(blog.title)

  screen.debug()
})