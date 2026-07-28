import { Pagination as MantinePagination, Group, Text, Select } from '@mantine/core'

export default function Pagination({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange }) {
  const totalPages = Math.ceil(count / rowsPerPage)

  return (
    <Group justify="space-between" align="center" mt="md">
      <Group gap="xs">
        <Text size="sm" c="dimmed">Filas por página:</Text>
        <Select
          size="xs"
          value={rowsPerPage.toString()}
          onChange={(value) => onRowsPerPageChange(parseInt(value, 10))}
          data={['5', '10', '25'].map(v => ({ value: v, label: v }))}
          style={{ width: 70 }}
        />
      </Group>
      <Text size="sm" c="dimmed">
        {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, count)} de {count}
      </Text>
      <MantinePagination total={totalPages} value={page + 1} onChange={(val) => onPageChange(val - 1)} size="sm" />
    </Group>
  )
}
