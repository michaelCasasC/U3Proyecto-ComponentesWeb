import { Avatar as MantineAvatar } from '@mantine/core'

export default function Avatar({ name, src, size = 40, ...props }) {
  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  return (
    <MantineAvatar src={src} size={size} color="primary" {...props}>
      {!src && getInitials(name)}
    </MantineAvatar>
  )
}
