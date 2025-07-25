import axios from 'axios'
import type { inlogResponseData } from '../types/inlog.types'

const baseUrl = '/api/login'

const login = async (credentials: {username: string, password: string}) => {
  const response = await axios.post<inlogResponseData>(baseUrl, credentials)
  return response.data
}

export default { login }