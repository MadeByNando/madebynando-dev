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
  const searchParams = useSearchParams()

  // Créer une clé de dépendance pour détecter les changements de route
  // Cela évite de créer un nouvel objet à chaque rendu
  const routeKey = useMemo(() => {
    return `${pathname}?${searchParams?.toString() || ''}`
  }, [pathname, searchParams])

  // Désactiver les animations lors du chargement initial
  useEffect(() => {
    // Attendre que le composant soit monté et rendu
    const timer = setTimeout(() => {
      setShouldAnimate(true)
      setIsPageTransitioning(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Gérer les transitions de page
  useEffect(() => {
    // Ne pas déclencher de transition si nous sommes déjà en transition
    if (!isPageTransitioning) {
      setIsPageTransitioning(true)

      // Réactiver les animations après un court délai
      const timer = setTimeout(() => {
        setIsPageTransitioning(false)
      }, 50)

      return () => clearTimeout(timer)
    }
  }, [routeKey, isPageTransitioning])

  // Mémoriser la valeur du contexte pour éviter les re-rendus inutiles
  const contextValue = useMemo(
    () => ({
      shouldAnimate,
      isPageTransitioning,
    }),
    [shouldAnimate, isPageTransitioning],
  )

  return <AnimationContext.Provider value={contextValue}>{children}</AnimationContext.Provider>
}
