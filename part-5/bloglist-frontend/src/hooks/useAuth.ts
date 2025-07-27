import { createContext, useContext } from 'react'
import type { inlogPostResponseData } from '../types/inlog.types'

interface AuthContextType {
  user: inlogPostResponseData | undefined
  login: (userData: inlogPostResponseData) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}