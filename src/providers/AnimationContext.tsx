'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react'
import { usePathname } from 'next/navigation'

type AnimationContextType = {
  isPageTransitioning: boolean
}

const AnimationContext = createContext<AnimationContextType>({
  isPageTransitioning: false,
})

export const useAnimation = () => useContext(AnimationContext)

type AnimationProviderProps = {
  children: ReactNode
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  const [isPageTransitioning, setIsPageTransitioning] = useState(false)
  const pathname = usePathname()

  // Gérer uniquement les transitions de page
  useEffect(() => {
    setIsPageTransitioning(true)

    const timer = setTimeout(() => {
      setIsPageTransitioning(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname])

  const contextValue = useMemo(
    () => ({
      isPageTransitioning,
    }),
    [isPageTransitioning],
  )

  return <AnimationContext.Provider value={contextValue}>{children}</AnimationContext.Provider>
}
