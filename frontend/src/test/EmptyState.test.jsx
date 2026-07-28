import React from 'react'
import { screen } from '@testing-library/react'
import { render } from './setup'
import { describe, it, expect } from 'vitest'
import EmptyState from '../components/common/EmptyState'

describe('EmptyState', () => {
  it('renders with default props', () => {
    render(<EmptyState />)
    expect(screen.getByText('No hay datos disponibles')).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    render(<EmptyState message="No hay citas programadas" />)
    expect(screen.getByText('No hay citas programadas')).toBeInTheDocument()
  })
})
