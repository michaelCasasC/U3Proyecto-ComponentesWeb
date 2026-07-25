import { Card, CardContent, Typography, Box } from '@mui/material'

export default function DashboardCards({ title, value, icon: Icon, color = 'primary.main', subtitle }) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>{title}</Typography>
            <Typography variant="h3" fontWeight={700} color={color}>{value}</Typography>
            {subtitle && <Typography variant="body2" color="text.secondary" mt={1}>{subtitle}</Typography>}
          </Box>
          <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon sx={{ fontSize: 28, color }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
