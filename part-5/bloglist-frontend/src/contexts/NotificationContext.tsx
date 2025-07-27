import { useState, useRef, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'

import type { NotificationState } from '../hooks/useNotification'
import { NotificationContext } from '../hooks/useNotification'


interface NotificationProviderProps {
  children: ReactNode
  duration?: number
}

const NotificationProvider = ({ children, duration = 3000 }: NotificationProviderProps) => {
  const [notification, setNotification] = useState<NotificationState>({
    message: null,
    isError: false
  })
  
  const timeoutRef = useRef<number | null>(null)

  const pushNotification = useCallback((message: string, isError: boolean = false) => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setNotification({ message, isError })
    
    timeoutRef.current = setTimeout(() => {
      setNotification({ message: null, isError: false })
    }, duration)
  }, [duration])

  const clearNotification = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setNotification({ message: null, isError: false })
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const value = {
    notification,
    pushNotification,
    clearNotification
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider