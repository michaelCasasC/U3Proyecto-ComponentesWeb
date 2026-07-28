import { Card, CardContent, Typography, Box, Button, useTheme } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import ChipStatus from '../common/ChipStatus'

export default function AppointmentCard({ appointment, onCancel }) {
  const theme = useTheme()

  return (
    <Card sx={{
      mb: 2.5,
      border: '1px solid',
      borderColor: 'divider',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.palette.mode === 'dark' ? '0 8px 24px rgba(0,0,0,0.5)' : '0 8px 24px rgba(37,99,235,0.08)',
        borderColor: theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(37, 99, 235, 0.25)',
      },
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Box sx={{
              width: 52,
              height: 52,
              borderRadius: 3,
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(37, 99, 235, 0.15)' : 'rgba(37, 99, 235, 0.08)',
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <MedicalServicesIcon />
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: '-0.01em' }}>
                {appointment.doctorName}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ mb: 1.5 }}>
                {appointment.specialty}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', px: 1.25, py: 0.5, borderRadius: 2 }}>
                  <CalendarTodayIcon fontSize="small" color="primary" />
                  <Typography variant="body2" fontWeight={600}>{appointment.date}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', px: 1.25, py: 0.5, borderRadius: 2 }}>
                  <AccessTimeIcon fontSize="small" color="primary" />
                  <Typography variant="body2" fontWeight={600}>{appointment.time}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <PersonIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">{appointment.patientName}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', sm: 'flex-end' }, gap: 1.5 }}>
            <ChipStatus status={appointment.status} />
            {appointment.status === 'Pendiente' && (
              <Button size="small" color="error" variant="outlined" onClick={() => onCancel(appointment.id)} sx={{ borderRadius: 2 }}>
                Cancelar Cita
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
