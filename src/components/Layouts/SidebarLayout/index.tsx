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

// Pour SidebarHeader, on doit permettre les mises à jour basées sur isVisible
// mais ignorer les changements de pathname
const PersistentSidebarHeader = React.memo(
  (props: React.ComponentProps<typeof SidebarHeader>) => <SidebarHeader {...props} />,
  (prevProps, nextProps) => {
    // Re-rendre seulement si isVisible change
    return prevProps.isVisible === nextProps.isVisible
  },
)
PersistentSidebarHeader.displayName = 'PersistentSidebarHeader'

type SidebarLayoutProps = {
  children: React.ReactNode
}

// Utiliser memo avec une fonction de comparaison qui ignore les enfants
// mais pas les changements importants d'état interne
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
      if (!isMounted) {
        setIsMounted(true)
        // Initialiser l'état du header une fois monté
        setHeaderVisible(!sidebarOpen)
        console.log('SidebarLayout mounted, initializing headerVisible:', !sidebarOpen)
      }
    }, [sidebarOpen, isMounted])

    // Écouter les changements d'état de la sidebar pour mettre à jour l'état du header
    useEffect(() => {
      if (isMounted) {
        setHeaderVisible(!sidebarOpen)
        console.log('sidebarOpen changed, updating headerVisible to:', !sidebarOpen)
      }
    }, [sidebarOpen, isMounted])

    // Mémoriser la fonction de callback pour éviter les re-rendus inutiles
    const handleSidebarToggle = useCallback(
      (isOpen: boolean) => {
        // Mettre à jour l'état de la sidebar
        setSidebarOpen(isOpen)
        console.log('Sidebar toggled, new state:', isOpen)
      },
      [setSidebarOpen],
    )

    // Console.log pour débogage (à retirer en production)
    useEffect(() => {
      console.log('SidebarLayout rendered, pathname:', pathname)
      console.log('headerVisible:', headerVisible, 'sidebarOpen:', sidebarOpen)
    }, [pathname, headerVisible, sidebarOpen])

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
  // Permettre les re-rendus pour les enfants, mais pas pour les changements d'URL
  (prevProps, nextProps) => {
    // Quand les enfants changent, on veut que le layout se re-rende
    // pour que les enfants puissent être mis à jour, mais pas à cause des
    // changements d'URL
    return false // Toujours autoriser les re-rendus pour que les enfants soient mis à jour
  },
)

// Ajouter un displayName pour faciliter le débogage
SidebarLayout.displayName = 'SidebarLayout'
