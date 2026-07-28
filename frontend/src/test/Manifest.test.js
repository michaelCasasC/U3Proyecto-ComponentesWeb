import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const manifestPath = resolve(__dirname, '../../public/manifest.webmanifest')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'))

describe('PWA Manifest (splash screen)', () => {
  it('has background_color matching splash screen', () => {
    expect(manifest.background_color).toBe('#1976d2')
  })

  it('has theme_color matching splash screen', () => {
    expect(manifest.theme_color).toBe('#1976d2')
  })

  it('has display standalone for native splash', () => {
    expect(manifest.display).toBe('standalone')
  })

  it('has maskable icons for adaptive splash', () => {
    const maskable = manifest.icons.filter(i => i.purpose?.includes('maskable'))
    expect(maskable.length).toBeGreaterThanOrEqual(2)
  })

  it('has a 512x512 icon for splash', () => {
    const big = manifest.icons.find(i => i.sizes === '512x512')
    expect(big).toBeDefined()
  })

  it('has description for splash metadata', () => {
    expect(manifest.description).toBeTruthy()
    expect(manifest.description.length).toBeGreaterThan(20)
  })

  it('has screenshots array', () => {
    expect(Array.isArray(manifest.screenshots)).toBe(true)
    expect(manifest.screenshots.length).toBeGreaterThanOrEqual(2)
  })
})
