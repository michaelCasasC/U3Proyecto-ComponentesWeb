import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SplashScreen from '../components/common/SplashScreen'

describe('SplashScreen', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('renders app name and subtitle', () => {
    render(<SplashScreen onFinish={vi.fn()} />)
    expect(screen.getByText('MediCitas')).toBeInTheDocument()
    expect(screen.getByText('Gestión de Citas Médicas')).toBeInTheDocument()
  })

  it('shows a loading spinner', () => {
    render(<SplashScreen onFinish={vi.fn()} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('calls onFinish after minimum display time', () => {
    const onFinish = vi.fn()
    render(<SplashScreen onFinish={onFinish} />)
    expect(onFinish).not.toHaveBeenCalled()
    act(() => { vi.advanceTimersByTime(1500) })
    act(() => { vi.advanceTimersByTime(400) })
    expect(onFinish).toHaveBeenCalledOnce()
  })

  it('has blue background', () => {
    const { container } = render(<SplashScreen onFinish={vi.fn()} />)
    const box = container.firstChild
    expect(box).toHaveStyle('background-color: #1976d2')
  })
})
