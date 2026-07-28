import '@testing-library/jest-dom'
import React from 'react'
import { MantineProvider } from '@mantine/core'
import { render as rtlRender } from '@testing-library/react'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

function Wrapper({ children }) {
  return React.createElement(MantineProvider, { forceColorScheme: 'light' }, children)
}

const customRender = (ui, options) =>
  rtlRender(ui, { wrapper: Wrapper, ...options })

export { customRender as render }
