import { useEffect, useState } from 'react'

/**
 * Hook to detect mobile devices and performance optimization needs
 * Returns animation settings based on device capabilities
 */
export const useMobileOptimization = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Detect mobile
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
    setIsMobile(mobile)

    // Detect low performance device
    const cores = navigator.hardwareConcurrency || 1
    const ram = navigator.deviceMemory || 4
    const isLow = cores <= 2 || ram <= 2
    setIsLowPerformance(isLow)

    // Detect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setPrefersReducedMotion(prefersReduced)
  }, [])

  // Animation configuration based on device
  const animationConfig = {
    duration: prefersReducedMotion || isLowPerformance ? 0.01 : isMobile ? 0.2 : 0.3,
    delay: prefersReducedMotion || isLowPerformance ? 0 : isMobile ? 0.05 : 0.1,
    shouldAnimate: !prefersReducedMotion && !isLowPerformance,
    shouldReduceMotion: prefersReducedMotion || isLowPerformance || isMobile,
  }

  return {
    isMobile,
    isLowPerformance,
    prefersReducedMotion,
    animationConfig,
    // Framer Motion variants for optimized animations
    pageVariants: {
      hidden: { opacity: 0, y: animationConfig.shouldAnimate ? 10 : 0 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: animationConfig.duration,
          delay: animationConfig.delay,
        },
      },
      exit: { opacity: 0, y: animationConfig.shouldAnimate ? -10 : 0 },
    },
  }
}

/**
 * Get optimized Framer Motion configuration for animations
 */
export const getOptimizedMotionConfig = (isMobile = false, prefersReducedMotion = false) => {
  const shouldAnimate = !prefersReducedMotion && !isMobile
  
  return {
    initial: { opacity: shouldAnimate ? 0 : 1 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: shouldAnimate ? 0.3 : 0.01,
      ease: 'easeInOut',
    },
  }
}
