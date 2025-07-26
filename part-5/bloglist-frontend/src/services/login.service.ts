import axios from 'axios'
import type { inlogPostResponseData, loginCredentials } from '../types/inlog.types'

const baseUrl = '/api/login'

const login = async (credentials: loginCredentials) => {
  const response = await axios.post<inlogPostResponseData>(baseUrl, credentials)
  return response.data
}

export default { login }