import { Box, Typography } from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'

export default function EmptyState({ message = 'No hay datos disponibles', icon: Icon = InboxIcon }) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight={300}>
      <Icon sx={{ fontSize: 64, color: 'text.disabled' }} />
      <Typography variant="h6" color="text.secondary" mt={2}>{message}</Typography>
    </Box>
  )
}
