import { useState } from 'react'
import blogsService from '../services/blogs.service'
import axios from 'axios'
import { useNotification } from '../hooks/useNotification'

interface CreateBlogProps {
  onBlogCreated: () => void
}

const CreateBlog = ({ onBlogCreated }: CreateBlogProps) => {
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [url, setUrl] = useState<string>('')

  const { pushNotification } = useNotification()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await blogsService.create({ title, author, url })

      setTitle('')
      setAuthor('')
      setUrl('')

      pushNotification(`A new blog "${title}", by ${author} is added`, false)
      
      onBlogCreated()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || "An unknown error occurred";
        pushNotification(errorMessage, true)
      }
      console.error('Failed to create blog: ', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="title">Title</label>
            </td>
            <td>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="author">Author</label>
            </td>
            <td>
              <input
                type="text"
                name="author"
                id="author"
                value={author}
                onChange={event => setAuthor(event.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="url">URL</label>
            </td>
            <td>
              <input
                type="text"
                name="url"
                id="url"
                value={url}
                onChange={event => setUrl(event.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <button type="submit">Create</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

export default CreateBlog