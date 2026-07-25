import { Box, Toolbar } from '@mui/material'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import NotificationSnackbar from '../components/common/NotificationSnackbar'

export default function AdminLayout() {
  const { user, isAdmin } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box display="flex" flexGrow={1}>
        <Sidebar open={true} />
        <Box component="main" flexGrow={1} sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
      <Footer />
      <NotificationSnackbar />
    </Box>
  )
}
