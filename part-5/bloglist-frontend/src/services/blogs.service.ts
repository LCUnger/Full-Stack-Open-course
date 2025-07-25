import axios from 'axios'
import type { BlogType } from '../types/blog.types'

const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get<BlogType[]>(baseUrl)
  return response.data
}

export default { getAll }