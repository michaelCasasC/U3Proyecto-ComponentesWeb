import React from 'react'
import { screen } from '@testing-library/react'
import { render } from './setup'
import { describe, it, expect, vi } from 'vitest'
import ErrorMessage from '../components/common/ErrorMessage'

describe('ErrorMessage', () => {
  it('renders error message', () => {
    render(<ErrorMessage message="Error al cargar los datos" />)
    expect(screen.getByText('Error al cargar los datos')).toBeInTheDocument()
  })

  it('calls onRetry when retry button is clicked', () => {
    const onRetry = vi.fn()
    render(<ErrorMessage message="Error" onRetry={onRetry} />)
    screen.getByText('Reintentar').click()
    expect(onRetry).toHaveBeenCalledOnce()
  })
})
