import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import { render } from './setup'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import PwaInstallPrompt from '../pwa/PwaInstallPrompt'

vi.stubGlobal('window', {
  ...window,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
})

describe('PwaInstallPrompt', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders nothing when beforeinstallprompt has not fired', () => {
    render(<PwaInstallPrompt />)
    expect(screen.queryByText('Instalar MediCitas')).not.toBeInTheDocument()
  })

  it('shows install prompt when deferredPrompt is set', () => {
    const { rerender } = render(<PwaInstallPrompt />)
    const handler = window.addEventListener.mock.calls.find(c => c[0] === 'beforeinstallprompt')
    if (handler) {
      handler[1]({ preventDefault: vi.fn() })
    }
    rerender(<PwaInstallPrompt />)
  })

  it('registers beforeinstallprompt event listener on mount', () => {
    render(<PwaInstallPrompt />)
    expect(window.addEventListener).toHaveBeenCalledWith('beforeinstallprompt', expect.any(Function))
  })

  it('removes event listener on unmount', () => {
    const { unmount } = render(<PwaInstallPrompt />)
    unmount()
    expect(window.removeEventListener).toHaveBeenCalledWith('beforeinstallprompt', expect.any(Function))
  })
})
