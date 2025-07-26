import { useState, useEffect } from "react"

import { AuthContext } from "./useAuthContext"

import type { ReactNode } from "react"
import type { inlogPostResponseData } from "../types/inlog.types"


const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<inlogPostResponseData>()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser) as inlogPostResponseData
        setUser(userData)
      } catch (error) {
        console.error('Failed to parse stored user data:', error)
        localStorage.removeItem('user') // Remove corrupted data
      }
    }
  }, [])

  const login = (userData: inlogPostResponseData) => {
    setUser(userData)

    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(undefined)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value ={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider