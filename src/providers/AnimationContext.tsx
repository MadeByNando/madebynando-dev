'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

type AnimationContextType = {
  shouldAnimate: boolean
  isPageTransitioning: boolean
  visitedRoutes: Set<string>
  hasVisitedRoute: (route: string) => boolean
}

const AnimationContext = createContext<AnimationContextType>({
  shouldAnimate: false,
  isPageTransitioning: false,
  visitedRoutes: new Set<string>(),
  hasVisitedRoute: () => false,
})

export const useAnimation = () => useContext(AnimationContext)

type AnimationProviderProps = {
  children: ReactNode
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [isPageTransitioning, setIsPageTransitioning] = useState(true)
  const [visitedRoutes, setVisitedRoutes] = useState<Set<string>>(new Set())

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const routeKey = useMemo(() => {
    return `${pathname}?${searchParams?.toString() || ''}`
  }, [pathname, searchParams])

  useEffect(() => {
    if (pathname) {
      setVisitedRoutes((prev) => {
        const newSet = new Set(prev)
        newSet.add(pathname)
        return newSet
      })
    }
  }, [pathname])

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
  }, [routeKey, isPageTransitioning])

  const hasVisitedRoute = useCallback(
    (route: string) => {
      return visitedRoutes.has(route)
    },
    [visitedRoutes],
  )

  const contextValue = useMemo(
    () => ({
      shouldAnimate,
      isPageTransitioning,
      visitedRoutes,
      hasVisitedRoute,
    }),
    [shouldAnimate, isPageTransitioning, visitedRoutes, hasVisitedRoute],
  )

  return <AnimationContext.Provider value={contextValue}>{children}</AnimationContext.Provider>
}
