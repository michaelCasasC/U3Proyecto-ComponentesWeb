import { Box } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import NotificationSnackbar from '../components/common/NotificationSnackbar'
import PwaInstallPrompt from '../pwa/PwaInstallPrompt'

export default function MainLayout() {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box style={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar open={true} />
        <Box component="main" style={{ flexGrow: 1, padding: '24px', minHeight: '100vh' }}>
          <Box style={{ height: 'var(--navbar-height, 60px)' }} />
          <Outlet />
        </Box>
      </Box>
      <Footer />
      <NotificationSnackbar />
      <PwaInstallPrompt />
    </Box>
  )
}
