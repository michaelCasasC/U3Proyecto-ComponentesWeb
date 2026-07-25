import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'

export default function ConfirmationDialog({ open, title, message, confirmText = 'Confirmar', cancelText = 'Cancelar', onConfirm, onCancel, severity = 'error' }) {
  const colors = { error: 'error', warning: 'warning', info: 'primary' }
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title || 'Confirmar acción'}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message || '¿Está seguro de realizar esta acción?'}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">{cancelText}</Button>
        <Button onClick={onConfirm} variant="contained" color={colors[severity] || 'primary'}>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  )
}
