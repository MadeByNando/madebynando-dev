'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react'
import { usePathname } from 'next/navigation'

type AnimationContextType = {
  shouldAnimate: boolean
  isPageTransitioning: boolean
}

const AnimationContext = createContext<AnimationContextType>({
  shouldAnimate: false,
  isPageTransitioning: false,
})

export const useAnimation = () => useContext(AnimationContext)

type AnimationProviderProps = {
  children: ReactNode
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [isPageTransitioning, setIsPageTransitioning] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAnimate(true)
      setIsPageTransitioning(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isPageTransitioning) {
      setIsPageTransitioning(true)

      const timer = setTimeout(() => {
        setIsPageTransitioning(false)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [pathname, isPageTransitioning])

  const contextValue = useMemo(
    () => ({
      shouldAnimate,
      isPageTransitioning,
    }),
    [shouldAnimate, isPageTransitioning],
  )

  return <AnimationContext.Provider value={contextValue}>{children}</AnimationContext.Provider>
}
