import React from 'react'
import { screen, act } from '@testing-library/react'
import { render } from './setup'
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
    expect(document.querySelector('.mantine-Loader-root')).toBeInTheDocument()
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
    render(<SplashScreen onFinish={vi.fn()} />)
    const box = document.querySelector('[style*="background-color"]')
    expect(box).toHaveStyle('background-color: rgb(25, 118, 210)')
  })
})
