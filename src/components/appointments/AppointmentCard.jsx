import { Card, CardContent, Typography, Box, Button, Chip } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import ChipStatus from '../common/ChipStatus'

export default function AppointmentCard({ appointment, onCancel }) {
  return (
    <Card sx={{ mb: 2, '&:hover': { boxShadow: 4 } }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
          <Box>
            <Typography variant="h6" fontWeight={600}>{appointment.doctorName}</Typography>
            <Typography variant="body2" color="text.secondary">{appointment.specialty}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <CalendarTodayIcon fontSize="small" color="action" />
              <Typography variant="body2">{appointment.date}</Typography>
              <AccessTimeIcon fontSize="small" color="action" sx={{ ml: 1 }} />
              <Typography variant="body2">{appointment.time}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <PersonIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">{appointment.patientName}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
            <ChipStatus status={appointment.status} />
            {appointment.status === 'Pendiente' && (
              <Button size="small" color="error" variant="outlined" onClick={() => onCancel(appointment.id)}>Cancelar</Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
