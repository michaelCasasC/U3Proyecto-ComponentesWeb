import { subscribeToPushNotifications } from '../services/pushNotifications'

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js')
        console.log('SW registered:', registration.scope)

        const token = localStorage.getItem('token')
        if (token && Notification.permission === 'default') {
          const permission = await Notification.requestPermission()
          if (permission === 'granted' && localStorage.getItem('pushEnabled') !== 'false') {
            await subscribeToPushNotifications()
          }
        }
      } catch (error) {
        console.log('SW registration failed:', error)
      }
    })
  }
}
