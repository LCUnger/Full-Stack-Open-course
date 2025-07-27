import AuthProvider from './contexts/AuthContext'
import AppContent from './components/AppContent'
import NotificationProvider from './contexts/NotificationContext'

const App = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <AppContent/>
      </AuthProvider>
    </NotificationProvider>
  )
}

export default App