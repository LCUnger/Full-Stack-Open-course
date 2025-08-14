import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'
import type { BlogType } from '../types/blog.types'
import NotificationProvider from '../contexts/NotificationContext'
import AuthProvider from '../contexts/AuthContext'


const testBlog: BlogType = {
  title: "test blog 1",
  author: "test author",
  url: "test.example.com",
  likes: 7027346,
  id: "69",
  user: {
    _id: "345678",
    username: "Vitest_Tester",
    name: "Vitest"
  }
}



test('renders content', () => {
  const { container } = render(
    <AuthProvider>
      <NotificationProvider>
        <Blog blog={testBlog} onBlogRemoved={() => {console.log('remove blog...temp')}} />
      </NotificationProvider>
    </AuthProvider>
  )

  const blogElement = container.querySelector('.blog')

  expect(blogElement).toBeTruthy()

  expect(blogElement?.textContent).toContain(testBlog.title)
  expect(blogElement?.textContent).toContain(testBlog.author)
  expect(blogElement?.textContent).not.toContain(testBlog.url)
  expect(blogElement?.textContent).not.toContain(testBlog.likes)
})

test('renders hidden content after expanding', async () => {
  const user = userEvent.setup()

  const { container } = render(
    <AuthProvider>
      <NotificationProvider>
        <Blog blog={testBlog} onBlogRemoved={() => {console.log('remove blog...temp')}} />
      </NotificationProvider>
    </AuthProvider>
  )

  const blogElement = container.querySelector('.blog')

  const viewButton = screen.getByRole('button', { name: 'view' })
  expect(viewButton).toBeInTheDocument()

  await user.click(viewButton)

    expect(blogElement).toBeTruthy()

  expect(blogElement?.textContent).toContain(testBlog.title)
  expect(blogElement?.textContent).toContain(testBlog.author)
  expect(blogElement?.textContent).toContain(testBlog.url)
  expect(blogElement?.textContent).toContain(testBlog.likes)

})