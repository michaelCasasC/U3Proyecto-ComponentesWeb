import { Box, Paper, Typography, Grid, Divider } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import BadgeIcon from '@mui/icons-material/Badge'
import { useAuth } from '../context/AuthContext'
import Breadcrumb from '../components/common/Breadcrumb'
import PageHeader from '../components/common/PageHeader'
import Avatar from '../components/common/Avatar'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <Box>
      <Breadcrumb />
      <PageHeader title="Mi Perfil" subtitle="Información personal de la cuenta" />
      <Paper sx={{ p: 4, maxWidth: 600 }}>
        <Box display="flex" alignItems="center" gap={3} mb={4}>
          <Avatar name={user?.name} size={96} />
          <Box>
            <Typography variant="h5" fontWeight={600}>{user?.name}</Typography>
            <Typography variant="body2" color="text.secondary">{user?.role === 'admin' ? 'Administrador' : 'Paciente'}</Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Box display="flex" alignItems="center" gap={1}>
              <EmailIcon color="action" />
              <Typography variant="body1">{user?.email}</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box display="flex" alignItems="center" gap={1}>
              <BadgeIcon color="action" />
              <Typography variant="body1">ID: {user?.id}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
