import { Button, Loader } from '@mantine/core'

export default function CustomButton({ children, loading, icon: Icon, variant = 'filled', color = 'primary', ...props }) {
  return (
    <Button
      variant={variant}
      color={color}
      disabled={loading}
      leftSection={Icon && !loading ? <Icon size={18} /> : null}
      styles={{ root: { minWidth: 120 } }}
      {...props}
    >
      {loading ? <Loader size={22} color="white" /> : children}
    </Button>
  )
}
