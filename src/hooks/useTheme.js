import { useUserStore } from '../stores/userStore'

export function useTheme() {
  const { theme } = useUserStore()
  const dark = theme === 'dark'

  return {
    theme,
    dark,
    bg:     dark ? '#080808' : '#f0f0f0',
    bg2:    dark ? '#0f0f0f' : '#ffffff',
    bg3:    dark ? '#161616' : '#e8e8e8',
    border: dark ? '#1e1e1e' : '#dddddd',
    border2:dark ? '#2a2a2a' : '#cccccc',
    text:   dark ? '#ffffff' : '#111111',
    text2:  dark ? '#888888' : '#666666',
    text3:  dark ? '#444444' : '#999999',
    card:   dark ? '#0f0f0f' : '#ffffff',
    input:  dark ? '#080808' : '#f8f8f8',
    foodTag:dark ? '#161616' : '#f0f0f0',
    foodTagBorder: dark ? '#2a2a2a' : '#e0e0e0',
    foodTagText:   dark ? '#cccccc' : '#444444',
    navBg:  dark ? 'rgba(10,10,10,0.95)' : 'rgba(255,255,255,0.95)',
    navBorder: dark ? '#1e1e1e' : '#e0e0e0',
  }
}