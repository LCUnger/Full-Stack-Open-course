import { useState } from 'react'
import blogsService from '../services/blogs.service'

const CreateBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    try {

    await blogsService.create({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
    
    } catch (error) {
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