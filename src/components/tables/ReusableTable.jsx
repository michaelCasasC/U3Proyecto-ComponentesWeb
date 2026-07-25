import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, TableSortLabel } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function ReusableTable({ columns, rows, onEdit, onDelete, order, orderBy, onSort }) {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: 'action.hover' }}>
            {columns.map(col => (
              <TableCell key={col.field} sortDirection={orderBy === col.field ? order : false}>
                {col.sortable !== false ? (
                  <TableSortLabel active={orderBy === col.field} direction={orderBy === col.field ? order : 'asc'} onClick={() => onSort(col.field)}>
                    {col.headerName}
                  </TableSortLabel>
                ) : col.headerName}
              </TableCell>
            ))}
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id} hover>
              {columns.map(col => (
                <TableCell key={col.field}>
                  {col.render ? col.render(row) : row[col.field]}
                </TableCell>
              ))}
              <TableCell align="right">
                <Tooltip title="Editar"><IconButton color="primary" size="small" onClick={() => onEdit(row)}><EditIcon /></IconButton></Tooltip>
                <Tooltip title="Eliminar"><IconButton color="error" size="small" onClick={() => onDelete(row)}><DeleteIcon /></IconButton></Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
