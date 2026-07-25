import { Avatar as MuiAvatar } from '@mui/material'

export default function Avatar({ name, src, size = 40, ...props }) {
  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  return (
    <MuiAvatar src={src} sx={{ width: size, height: size, bgcolor: 'primary.main', fontSize: size * 0.4 }} {...props}>
      {!src && getInitials(name)}
    </MuiAvatar>
  )
}
