import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'

export type Theme = 'dark' | 'light' | 'system'

interface ThemeProviderProps extends PropsWithChildren {
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeProviderValue {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const themeValues: Array<Theme> = ['dark', 'light', 'system']
const ThemeProviderContext = createContext<ThemeProviderValue | null>(null)

function isTheme(value: string | null): value is Theme {
  return value !== null && themeValues.includes(value as Theme)
}

function resolveTheme(theme: Theme, mediaQuery: MediaQueryList): Exclude<Theme, 'system'> {
  if (theme === 'system') {
    return mediaQuery.matches ? 'dark' : 'light'
  }

  return theme
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'tanstack-router-boilerplate-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const storedTheme = window.localStorage.getItem(storageKey)
    return isTheme(storedTheme) ? storedTheme : defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = () => {
      const resolvedTheme = resolveTheme(theme, mediaQuery)

      root.classList.remove('light', 'dark')
      root.classList.add(resolvedTheme)
      root.style.colorScheme = resolvedTheme
    }

    applyTheme()

    if (theme !== 'system') {
      return
    }

    mediaQuery.addEventListener('change', applyTheme)

    return () => {
      mediaQuery.removeEventListener('change', applyTheme)
    }
  }, [theme])

  const setTheme = useCallback(
    (nextTheme: Theme) => {
      window.localStorage.setItem(storageKey, nextTheme)
      setThemeState(nextTheme)
    },
    [storageKey],
  )

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [setTheme, theme],
  )

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeProviderContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
