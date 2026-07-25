import { Box, Typography } from '@mui/material'

export default function PageHeader({ title, subtitle, action }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={3}>
      <Box>
        <Typography variant="h4" fontWeight={700}>{title}</Typography>
        {subtitle && <Typography variant="body2" color="text.secondary" mt={0.5}>{subtitle}</Typography>}
      </Box>
      {action && <Box>{action}</Box>}
    </Box>
  )
}
