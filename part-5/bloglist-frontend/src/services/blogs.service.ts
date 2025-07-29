import axios from 'axios'
import type { BlogEntryType, BlogType } from '../types/blog.types'

const baseUrl = '/api/blogs'

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

const setToken = (token: string) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const getAll = async (): Promise<BlogType[]> => {
  const response = await apiClient.get<BlogType[]>('/')
  return response.data
}

const create = async (blog: BlogEntryType): Promise<BlogType> => {
  const response = await apiClient.post<BlogType>('/', blog)
  return response.data
}

const update = async (blog: BlogType) => {
  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    url: blog.url,
    user: blog.user._id
  }
  const response = await apiClient.put<BlogType>(`/${blog.id}`, updatedBlog)
  return response.data
}

const remove = async (blogId: string) => {
  const response = await apiClient.delete(`/${blogId}`)
  return response.data
}

export default { getAll, create, setToken, update, remove }