import React from 'react'
import { screen } from '@testing-library/react'
import { render } from './setup'
import { describe, it, expect } from 'vitest'
import LoadingSpinner from '../components/common/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders with default message', () => {
    render(<LoadingSpinner />)
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    render(<LoadingSpinner message="Cargando..." />)
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })
})
