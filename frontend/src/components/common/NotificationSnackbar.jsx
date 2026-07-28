import { Notification } from '@mantine/core'
import { useNotification } from '../../context/NotificationContext'
import { IconCheck, IconX, IconInfoCircle, IconAlertTriangle } from '@tabler/icons-react'

const severityIcons = {
  success: IconCheck,
  error: IconX,
  warning: IconAlertTriangle,
  info: IconInfoCircle,
}

export default function NotificationSnackbar() {
  const { notification, closeNotification } = useNotification()

  if (!notification.open) return null

  const Icon = severityIcons[notification.severity] || IconInfoCircle

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
      <Notification
        icon={<Icon size={20} />}
        color={notification.severity === 'error' ? 'red' : notification.severity === 'success' ? 'green' : notification.severity === 'warning' ? 'yellow' : 'blue'}
        onClose={closeNotification}
        withCloseButton
      >
        {notification.message}
      </Notification>
    </div>
  )
}
