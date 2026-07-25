import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { AppointmentsProvider } from './context/AppointmentsContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { NotificationProvider } from './context/NotificationContext'
import AppRouter from './routes/AppRouter'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppointmentsProvider>
          <FavoritesProvider>
            <NotificationProvider>
              <AppRouter />
            </NotificationProvider>
          </FavoritesProvider>
        </AppointmentsProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
