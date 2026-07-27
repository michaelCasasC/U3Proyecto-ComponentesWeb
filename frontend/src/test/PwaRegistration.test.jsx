import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('registerServiceWorker', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls register when serviceWorker is supported', async () => {
    const mockRegister = vi.fn(() => Promise.resolve({ scope: '/' }))
    vi.stubGlobal('navigator', {
      serviceWorker: { register: mockRegister }
    })
    vi.stubGlobal('window', { addEventListener: vi.fn((_event, cb) => cb()) })

    const { registerServiceWorker } = await import('../pwa/registerSW')
    registerServiceWorker()

    await vi.waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('/sw.js')
    })
  })

  it('does not register when serviceWorker is not supported', async () => {
    vi.stubGlobal('navigator', {})
    vi.stubGlobal('window', { addEventListener: vi.fn() })

    const mod = await import('../pwa/registerSW')
    mod.registerServiceWorker()

    expect(window.addEventListener).not.toHaveBeenCalledWith('load', expect.any(Function))
  })
})
