'use client'

import React, { useEffect, useCallback, useState } from 'react'
import { Sidebar } from '../../Sidebar'
import { SidebarHeader } from '../../SidebarHeader'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { usePathname } from 'next/navigation'

// Créer des versions persistantes des composants Sidebar et SidebarHeader en utilisant React.memo
// avec une fonction de comparaison personnalisée qui ignore les changements de pathname
const PersistentSidebar = React.memo(
  (props: React.ComponentProps<typeof Sidebar>) => <Sidebar {...props} />,
  () => true, // Toujours retourner true pour éviter les re-rendus
)
PersistentSidebar.displayName = 'PersistentSidebar'

const PersistentSidebarHeader = React.memo(
  (props: React.ComponentProps<typeof SidebarHeader>) => <SidebarHeader {...props} />,
  () => true, // Toujours retourner true pour éviter les re-rendus
)
PersistentSidebarHeader.displayName = 'PersistentSidebarHeader'

type SidebarLayoutProps = {
  children: React.ReactNode
}

// Utiliser memo avec une fonction de comparaison qui ignore les enfants
// pour éviter les re-rendus inutiles du layout lors des changements de page
export const SidebarLayout = React.memo(
  ({ children }: SidebarLayoutProps) => {
    // État pour suivre si le composant est monté (côté client)
    const [isMounted, setIsMounted] = useState(false)
    // Utiliser notre hook personnalisé pour persister l'état de la sidebar
    const [sidebarOpen, setSidebarOpen] = useLocalStorage<boolean>('sidebarOpen', true)
    const [headerVisible, setHeaderVisible] = useState(false) // Commencer avec false pour éviter les problèmes d'hydratation
    const pathname = usePathname()

    // S'assurer que le composant est monté avant d'appliquer les états côté client
    useEffect(() => {
      setIsMounted(true)
      // Initialiser l'état du header une fois monté
      setHeaderVisible(!sidebarOpen)
    }, [sidebarOpen])

    // Écouter les changements d'état de la sidebar pour mettre à jour l'état du header
    useEffect(() => {
      if (isMounted) {
        setHeaderVisible(!sidebarOpen)
      }
    }, [sidebarOpen, isMounted])

    // Mémoriser la fonction de callback pour éviter les re-rendus inutiles
    const handleSidebarToggle = useCallback(
      (isOpen: boolean) => {
        // Mettre à jour l'état de la sidebar
        setSidebarOpen(isOpen)
      },
      [setSidebarOpen],
    )

    // Console.log pour débogage (à retirer en production)
    useEffect(() => {
      console.log('SidebarLayout rendered, pathname:', pathname)
    }, [pathname])

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
            <PersistentSidebarHeader isVisible={headerVisible} />

            {/* Sidebar à gauche */}
            <PersistentSidebar onToggle={handleSidebarToggle} />
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
  },
  // Fonction de comparaison personnalisée pour le SidebarLayout
  // Ignorer les changements des enfants, ce qui est le cas lors des navigations
  (prevProps, nextProps) => {
    // Ne pas re-rendre le layout quand seuls les enfants changent
    return true // Toujours retourner true pour que le layout persiste
  },
)

// Ajouter un displayName pour faciliter le débogage
SidebarLayout.displayName = 'SidebarLayout'
