import { useState, useRef, useEffect, useCallback } from 'react'

export interface NotificationState {
  message: string | null
  isError: boolean
}

const useNotification = (duration: number = 3000) => {
  const [notification, setNotification] = useState<NotificationState>({
    message: null,
    isError: false
  })

  const timeoutRef = useRef<number | null>(null)

  const pushNotification = useCallback((message: string, isError: boolean = false) => {
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

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { notification, pushNotification, clearNotification }
}

export default useNotification