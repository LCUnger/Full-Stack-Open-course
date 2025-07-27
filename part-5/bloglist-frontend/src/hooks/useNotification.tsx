import { useContext, createContext } from "react"

export interface NotificationState {
  message: string | null
  isError: boolean
}

interface NotificationContextType {
  notification: NotificationState
  pushNotification: (message: string, isError?: boolean) => void
  clearNotification: () => void
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}