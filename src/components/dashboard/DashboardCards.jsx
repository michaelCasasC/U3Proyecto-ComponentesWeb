import { Card, CardContent, Typography, Box, useTheme } from '@mui/material'

export default function DashboardCards({ title, value, icon: Icon, color = 'primary.main', subtitle }) {
  const theme = useTheme()

  return (
    <Card sx={{
      height: '100%',
      border: '1px solid',
      borderColor: 'divider',
      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.palette.mode === 'dark' ? '0 10px 25px rgba(0,0,0,0.5)' : '0 10px 25px rgba(37,99,235,0.1)',
      },
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ letterSpacing: '0.02em', textTransform: 'uppercase', fontSize: '0.75rem', mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="h3" fontWeight={800} sx={{ color: 'text.primary', letterSpacing: '-0.02em', my: 0.5 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ mt: 1.25, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box sx={{
            width: 54,
            height: 54,
            borderRadius: 3.5,
            bgcolor: `${color}15`,
            border: `1px solid ${color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 6px 16px -2px ${color}20`,
          }}>
            <Icon sx={{ fontSize: 30, color }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
