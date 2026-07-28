import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

export default function SearchBar({ value, onChange, placeholder = 'Buscar...', ...props }) {
  return (
    <TextInput
      size="sm"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      leftSection={<IconSearch size={18} />}
      style={{ maxWidth: 400 }}
      mb="md"
      {...props}
    />
  )
}
