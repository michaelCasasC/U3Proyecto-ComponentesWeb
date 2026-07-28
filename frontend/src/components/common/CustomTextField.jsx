import { TextInput } from '@mantine/core'

export default function CustomTextField({ label, icon: Icon, error, helperText, ...props }) {
  return (
    <TextInput
      label={label}
      error={error}
      description={helperText}
      leftSection={Icon ? <Icon size={18} /> : null}
      mb="md"
      {...props}
    />
  )
}
