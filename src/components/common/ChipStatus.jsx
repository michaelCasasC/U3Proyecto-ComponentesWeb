import { Chip } from '@mui/material'

const statusConfig = {
  Pendiente: { color: 'warning', icon: 'Schedule' },
  Confirmada: { color: 'info', icon: 'CheckCircle' },
  Cancelada: { color: 'error', icon: 'Cancel' },
  Finalizada: { color: 'success', icon: 'CheckCircle' },
}

export default function ChipStatus({ status }) {
  const config = statusConfig[status] || { color: 'default' }
  return <Chip label={status} color={config.color} size="small" variant="outlined" />
}
