import { Badge } from '@mantine/core'

const statusConfig = {
  Pendiente: { color: 'yellow' },
  Confirmada: { color: 'blue' },
  Cancelada: { color: 'red' },
  Finalizada: { color: 'green' },
}

export default function ChipStatus({ status }) {
  const config = statusConfig[status] || { color: 'gray' }
  return <Badge color={config.color} variant="outline" size="sm">{status}</Badge>
}
