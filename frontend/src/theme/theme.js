import { createTheme } from '@mantine/core'

const getDesignTokens = (mode) => ({
  colors: {
    primary: ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'],
    secondary: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a'],
  },
  primaryColor: 'primary',
  fontFamily: '"Plus Jakarta Sans", "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  headings: {
    fontFamily: '"Plus Jakarta Sans", "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontWeight: '800', fontSize: '2.5rem', lineHeight: '1.2' },
      h2: { fontWeight: '700', fontSize: '2rem', lineHeight: '1.25' },
      h3: { fontWeight: '700', fontSize: '1.625rem', lineHeight: '1.3' },
      h4: { fontWeight: '700', fontSize: '1.375rem', lineHeight: '1.35' },
      h5: { fontWeight: '600', fontSize: '1.125rem', lineHeight: '1.4' },
      h6: { fontWeight: '600', fontSize: '1rem', lineHeight: '1.4' },
    },
  },
  fontSmoothing: true,
  defaultRadius: 14,
  components: {
    Card: {
      defaultProps: {
        radius: 18,
      },
      styles: {
        root: {
          boxShadow: mode === 'dark'
            ? '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.06)'
            : '0 4px 20px -2px rgba(37, 99, 235, 0.06), 0 0 0 1px rgba(226, 232, 240, 0.8)',
        },
      },
    },
    Paper: {
      defaultProps: {
        radius: 16,
      },
      styles: {
        root: {
          boxShadow: mode === 'dark'
            ? '0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06)'
            : '0 4px 20px -2px rgba(37, 99, 235, 0.05), 0 0 0 1px rgba(226, 232, 240, 0.8)',
        },
      },
    },
    Button: {
      defaultProps: {
        radius: 12,
      },
      styles: {
        root: {
          fontWeight: 600,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        filled: {
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          },
        },
        outline: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },
    Badge: {
      defaultProps: {
        radius: 10,
      },
      styles: {
        root: {
          fontWeight: 600,
        },
      },
    },
    Input: {
      styles: {
        input: {
          borderRadius: 12,
        },
      },
    },
  },
  ...(mode === 'dark'
    ? {
        colors: {
          primary: ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'],
          secondary: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a'],
          dark: ['#C1C2C5', '#A6A7AB', '#909296', '#5C5F66', '#373A40', '#2C2E33', '#25262B', '#1A1B1E', '#141517', '#101113'],
        },
        primaryColor: 'primary',
      }
    : {}),
})

export const getTheme = (mode) => createTheme(getDesignTokens(mode))
