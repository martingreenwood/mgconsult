import { ref, watch, onMounted } from 'vue'

export type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme-preference'
const currentTheme = ref<Theme>('system')
const isDark = ref(false)

export function useTheme() {
  // Get system preference
  const getSystemPreference = (): boolean => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  // Apply theme to document
  const applyTheme = (theme: Theme) => {
    let shouldBeDark = false

    if (theme === 'system') {
      shouldBeDark = getSystemPreference()
    } else {
      shouldBeDark = theme === 'dark'
    }

    isDark.value = shouldBeDark

    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Set theme
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    localStorage.setItem(STORAGE_KEY, theme)
    applyTheme(theme)
  }

  // Toggle between light and dark (skips system)
  const toggleTheme = () => {
    if (currentTheme.value === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  // Initialize theme
  const initTheme = () => {
    // Get saved preference or default to system
    const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null
    const initialTheme = savedTheme || 'system'

    currentTheme.value = initialTheme
    applyTheme(initialTheme)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (currentTheme.value === 'system') {
        applyTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleChange)

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }

  return {
    currentTheme,
    isDark,
    setTheme,
    toggleTheme,
    initTheme,
  }
}
