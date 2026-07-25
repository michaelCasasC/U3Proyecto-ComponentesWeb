import { Box, Rating as MuiRating, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

export default function Rating({ value, showValue = true, size = 'small' }) {
  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <MuiRating value={value} precision={0.1} readOnly icon={<StarIcon fontSize={size} />} emptyIcon={<StarIcon fontSize={size} />} />
      {showValue && <Typography variant="body2" fontWeight={600}>{value}</Typography>}
    </Box>
  )
}
