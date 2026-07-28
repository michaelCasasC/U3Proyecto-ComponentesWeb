import { Table, Group, ActionIcon, Tooltip } from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'

export default function ReusableTable({ columns, rows, onEdit, onDelete, order, orderBy, onSort }) {
  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          {columns.map(col => (
            <Table.Th key={col.field} style={{ cursor: col.sortable !== false ? 'pointer' : 'default' }}>
              {col.headerName}
            </Table.Th>
          ))}
          <Table.Th style={{ textAlign: 'right' }}>Acciones</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {rows.map(row => (
          <Table.Tr key={row.id}>
            {columns.map(col => (
              <Table.Td key={col.field}>
                {col.render ? col.render(row) : row[col.field]}
              </Table.Td>
            ))}
            <Table.Td style={{ textAlign: 'right' }}>
              <Group gap="xs" justify="flex-end">
                <Tooltip label="Editar">
                  <ActionIcon color="primary" variant="subtle" onClick={() => onEdit(row)}>
                    <IconPencil size={18} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Eliminar">
                  <ActionIcon color="red" variant="subtle" onClick={() => onDelete(row)}>
                    <IconTrash size={18} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
