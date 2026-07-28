import { useState, useCallback } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { AppointmentsProvider } from './context/AppointmentsContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { NotificationProvider } from './context/NotificationContext'
import AppRouter from './routes/AppRouter'
import SplashScreen from './components/common/SplashScreen'

function Main() {
  const [splashDone, setSplashDone] = useState(false)
  const handleFinish = useCallback(() => setSplashDone(true), [])

  if (!splashDone) return <SplashScreen onFinish={handleFinish} />

  return (
    <AuthProvider>
      <AppointmentsProvider>
        <FavoritesProvider>
          <NotificationProvider>
            <AppRouter />
          </NotificationProvider>
        </FavoritesProvider>
      </AppointmentsProvider>
    </AuthProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  )
}
