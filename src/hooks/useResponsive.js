import { useEffect, useState } from 'react'

export function useResponsive() {
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = screenWidth <= 640
  const isTablet = screenWidth > 640 && screenWidth <= 1024
  const isDesktop = screenWidth > 1024

  // Responsive values
  const padding = isMobile ? '16px' : '24px'
  const paddingLarge = isMobile ? '20px' : '28px'
  const gapSmall = isMobile ? 8 : 12
  const gapMedium = isMobile ? 12 : 16
  const gapLarge = isMobile ? 16 : 24

  // Font sizes
  const textXs = isMobile ? 11 : 12
  const textSm = isMobile ? 12 : 13
  const textBase = isMobile ? 14 : 15
  const textLg = isMobile ? 16 : 18
  const textXl = isMobile ? 24 : 28
  const textHeading = isMobile ? 28 : 36
  const textHeroHeading = isMobile ? 32 : 44

  // Backdrop blur intensity
  const blurIntensity = isMobile ? '5px' : '10px'
  const blurIntensityStrong = isMobile ? '8px' : '20px'

  return {
    isMobile,
    isTablet,
    isDesktop,
    screenWidth,
    padding,
    paddingLarge,
    gapSmall,
    gapMedium,
    gapLarge,
    textXs,
    textSm,
    textBase,
    textLg,
    textXl,
    textHeading,
    textHeroHeading,
    blurIntensity,
    blurIntensityStrong,
  }
}
