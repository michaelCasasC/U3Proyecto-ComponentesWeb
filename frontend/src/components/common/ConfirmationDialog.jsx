import { Modal, Text, Button, Group } from '@mantine/core'

export default function ConfirmationDialog({ open, title, message, confirmText = 'Confirmar', cancelText = 'Cancelar', onConfirm, onCancel, severity = 'error' }) {
  const colors = { error: 'red', warning: 'yellow', info: 'blue' }
  return (
    <Modal opened={open} onClose={onCancel} title={title || 'Confirmar acción'} size="sm">
      <Text size="sm" c="dimmed">{message || '¿Está seguro de realizar esta acción?'}</Text>
      <Group justify="flex-end" mt="lg">
        <Button onClick={onCancel} variant="default">{cancelText}</Button>
        <Button onClick={onConfirm} color={colors[severity] || 'blue'}>{confirmText}</Button>
      </Group>
    </Modal>
  )
}
