import { Box, Toolbar } from '@mui/material'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import NotificationSnackbar from '../components/common/NotificationSnackbar'

export default function MainLayout() {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar open={true} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
      <Footer />
      <NotificationSnackbar />
    </Box>
  )
}
