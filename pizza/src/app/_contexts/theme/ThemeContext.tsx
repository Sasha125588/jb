import { createContext } from 'react'

export type Theme = 'dark' | 'light' | 'system'

export interface ThemeContextValue {
  value: Exclude<Theme, 'system'>
  set: (theme: Theme) => void
  animate: (x: number, y: number, theme: Theme) => Promise<void>
}

export const ThemeContext = createContext<ThemeContextValue>({
  value: 'dark',
  set: () => {},
  animate: async () => {},
})
