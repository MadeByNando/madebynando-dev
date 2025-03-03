'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
  Suspense,
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

// Composant qui utilise useSearchParams, enveloppé dans un Suspense
const AnimationContent: React.FC = () => {
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

  return null // Ce composant n'affiche rien, il met juste à jour le contexte
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [isPageTransitioning, setIsPageTransitioning] = useState(true)
  const [visitedRoutes, setVisitedRoutes] = useState<Set<string>>(new Set())

  const pathname = usePathname()

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

  // La logique liée au routeKey est déplacée dans le composant AnimationContent
  useEffect(() => {
    if (!isPageTransitioning) {
      setIsPageTransitioning(true)

      const timer = setTimeout(() => {
        setIsPageTransitioning(false)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [pathname, isPageTransitioning])

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

  return (
    <AnimationContext.Provider value={contextValue}>
      <Suspense fallback={null}>
        <AnimationContent />
      </Suspense>
      {children}
    </AnimationContext.Provider>
  )
}
