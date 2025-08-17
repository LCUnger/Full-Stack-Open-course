import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {beforeEach, describe, test, vi} from 'vitest'

import CreateBlog from './CreateBlog'
import NotificationProvider from '../contexts/NotificationContext'
import type { BlogEntryType } from '../types/blog.types'
import blogsService from '../services/blogs.service'
import { useNotification } from '../hooks/useNotification'

const testBlog = {
  title: 'Test Blog',
  author: 'Test Author',
  url: 'https://test.com'
}

vi.mock('../services/blogs.service')
const mockBlogsService = vi.mocked(blogsService)

// vi.mock('../hooks/useNotification', () => ({
//   useNotification: () => ({
//     pushNotification: vi.fn()
//   })
// }))

describe('CreateBlog', () => {
    const mockOnBlogCreated = vi.fn()

    beforeEach(() => {
      vi.clearAllMocks()
    })
    
    test('creates a blog succesfully', async () => {

      const user = userEvent.setup()

      mockBlogsService.create.mockResolvedValue({
        id: '123',
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://test.com',
        likes: 0,
        user: { _id: '456', username: 'testuser', name: 'Test User' }
      })
      
      render(
        <NotificationProvider>
          <CreateBlog onBlogCreated={mockOnBlogCreated}/>
        </NotificationProvider>
      )

      const titleInput = screen.getByRole('textbox', { name: /title/i })
      const authorInput = screen.getByRole('textbox', { name: /author/i })
      const urlInput = screen.getByRole('textbox', { name: /url/i })
      const submitButton = screen.getByRole('button', { name: /create/i })
      expect(submitButton).toBeTruthy()

      await user.type(titleInput, testBlog.title)
      await user.type(authorInput, testBlog.author)
      await user.type(urlInput, testBlog.url)


      await user.click(submitButton)

      expect(mockBlogsService.create).toHaveBeenCalledWith(testBlog)

      expect(mockOnBlogCreated).toHaveBeenCalledTimes(1)
    
      expect(titleInput).toHaveValue('')
      expect(authorInput).toHaveValue('')
      expect(urlInput).toHaveValue('')
  })

    test('handles error when blog creation fails', async () => {
    const user = userEvent.setup()

    // Setup mock to reject
    mockBlogsService.create.mockRejectedValue({
      response: {
        data: { error: 'Blog creation failed' },
        status: 400
      }
    })

    render(
      <NotificationProvider>
        <CreateBlog onBlogCreated={mockOnBlogCreated}/>
      </NotificationProvider>
    )

    const titleInput = screen.getByLabelText(/title/i)
    const submitButton = screen.getByRole('button', { name: /create/i })

    // Fill and submit form
    await user.type(titleInput, 'Test Blog')
    await user.click(submitButton)

    // Verify service was called
    expect(mockBlogsService.create).toHaveBeenCalled()

    // Verify callback was NOT called on error
    expect(mockOnBlogCreated).not.toHaveBeenCalled()

    // Verify form was NOT reset on error
    expect(titleInput).toHaveValue('Test Blog')
  })
})

