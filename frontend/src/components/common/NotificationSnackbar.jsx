import { Snackbar, Alert } from '@mui/material'
import { useNotification } from '../../context/NotificationContext'

export default function NotificationSnackbar() {
  const { notification, closeNotification } = useNotification()

  return (
    <Snackbar open={notification.open} autoHideDuration={4000} onClose={closeNotification} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Alert onClose={closeNotification} severity={notification.severity} variant="filled" sx={{ width: '100%' }}>
        {notification.message}
      </Alert>
    </Snackbar>
  )
}
