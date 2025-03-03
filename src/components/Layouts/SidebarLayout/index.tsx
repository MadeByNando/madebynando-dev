'use client'

import React, { useEffect, useCallback, memo, useState } from 'react'
import { Sidebar } from '../../Sidebar'
import { SidebarHeader } from '../../SidebarHeader'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { usePathname } from 'next/navigation'
import { useAnimation } from '@/providers/AnimationContext'

type SidebarLayoutProps = {
  children: React.ReactNode
}

// Utiliser memo pour éviter les re-rendus inutiles
export const SidebarLayout: React.FC<SidebarLayoutProps> = memo(({ children }) => {
  // État pour suivre si le composant est monté (côté client)
  const [isMounted, setIsMounted] = useState(false)
  // Utiliser notre hook personnalisé pour persister l'état de la sidebar
  const [sidebarOpen, setSidebarOpen] = useLocalStorage<boolean>('sidebarOpen', true)
  const [headerVisible, setHeaderVisible] = useState(false) // Commencer avec false pour éviter les problèmes d'hydratation
  const pathname = usePathname()
  const { shouldAnimate } = useAnimation()

  // S'assurer que le composant est monté avant d'appliquer les états côté client
  useEffect(() => {
    setIsMounted(true)
    // Initialiser l'état du header une fois monté
    setHeaderVisible(!sidebarOpen)
  }, [])

  // Écouter les changements d'état de la sidebar pour mettre à jour l'état du header
  useEffect(() => {
    if (isMounted) {
      setHeaderVisible(!sidebarOpen)
    }
  }, [sidebarOpen, isMounted])

  // Effet pour éviter les réinitialisations lors des changements de page
  useEffect(() => {
    // Cette fonction vide permet de s'assurer que le composant ne se réinitialise pas
    // lors des changements de page, car elle crée une dépendance au pathname
    // sans déclencher de logique supplémentaire
  }, [pathname])

  // Mémoriser la fonction de callback pour éviter les re-rendus inutiles
  const handleSidebarToggle = useCallback(
    (isOpen: boolean) => {
      // Mettre à jour l'état de la sidebar
      setSidebarOpen(isOpen)
    },
    [setSidebarOpen],
  )

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Wrapper pour la navigation persistante */}
      <div className="fixed inset-0 z-40 pointer-events-none">
        <div className="pointer-events-auto">
          {/* ThemeSelector en position fixed en haut à droite - visible seulement quand la sidebar est ouverte */}
          {isMounted && sidebarOpen && (
            <header className="fixed top-4 right-4 z-50">
              <ThemeSelector />
            </header>
          )}

          {/* Header avec navigation - visible seulement quand la sidebar est fermée */}
          <SidebarHeader isVisible={headerVisible} />

          {/* Sidebar à gauche */}
          <Sidebar onToggle={handleSidebarToggle} />
        </div>
      </div>

      {/* Contenu principal */}
      <main className="flex-1 overflow-auto w-full h-full pt-2 pl-2 pr-2">
        <div
          className={`transition-all duration-500 ease-in-out ${isMounted && sidebarOpen ? 'ml-96' : 'ml-0'}`}
          style={{ minHeight: 'calc(100vh - 1rem)' }}
        >
          {children}
        </div>
      </main>
    </div>
  )
})
