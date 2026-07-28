import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import NotFoundPage from '../pages/NotFoundPage'

describe('NotFoundPage', () => {
  it('renders 404 message', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    )
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText(/Página no encontrada/i)).toBeInTheDocument()
  })

  it('renders a button to go home', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    )
    const btn = screen.getByRole('button', { name: /volver al inicio/i })
    expect(btn).toBeInTheDocument()
  })
})
