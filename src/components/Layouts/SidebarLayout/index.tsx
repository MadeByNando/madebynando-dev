'use client'

import React, { useEffect, useCallback, useState } from 'react'
import { Sidebar } from '../../Sidebar'
import { SidebarHeader } from '../../SidebarHeader'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { usePathname } from 'next/navigation'

// Types pour les props
type SidebarLayoutProps = {
  children: React.ReactNode
}

/**
 * Composant persistant pour Sidebar avec mémo optimisé
 * pour éviter les re-rendus lors des changements de pathname
 */
const PersistentSidebar = React.memo(
  (props: React.ComponentProps<typeof Sidebar>) => <Sidebar {...props} />,
  () => true, // Toujours retourner true pour garantir la persistance
)
PersistentSidebar.displayName = 'PersistentSidebar'

/**
 * Composant persistant pour SidebarHeader
 * re-rendu uniquement quand sa visibilité change
 */
const PersistentSidebarHeader = React.memo(
  (props: React.ComponentProps<typeof SidebarHeader>) => <SidebarHeader {...props} />,
  (prevProps, nextProps) => prevProps.isVisible === nextProps.isVisible,
)
PersistentSidebarHeader.displayName = 'PersistentSidebarHeader'

/**
 * Layout principal de l'application qui gère la disposition
 * de la barre latérale, de l'en-tête et du contenu principal
 */
export const SidebarLayout = React.memo(
  ({ children }: SidebarLayoutProps) => {
    // États et hooks
    const [isMounted, setIsMounted] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useLocalStorage<boolean>('sidebarOpen', true)
    const [headerVisible, setHeaderVisible] = useState(false)
    const pathname = usePathname()

    // Initialisation des états côté client
    useEffect(() => {
      if (!isMounted) {
        setIsMounted(true)
        setHeaderVisible(!sidebarOpen)
      }
    }, [sidebarOpen, isMounted])

    // Synchroniser l'état du header avec celui de la sidebar
    useEffect(() => {
      if (isMounted) {
        setHeaderVisible(!sidebarOpen)
      }
    }, [sidebarOpen, isMounted])

    // Callback mémorisé pour le toggle de la sidebar
    const handleSidebarToggle = useCallback(
      (isOpen: boolean) => {
        setSidebarOpen(isOpen)
      },
      [setSidebarOpen],
    )

    return (
      <div className="flex h-screen overflow-hidden">
        {/* Wrapper pour éléments de navigation persistants */}
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div className="pointer-events-auto">
            {/* ThemeSelector visible uniquement quand la sidebar est ouverte */}
            {isMounted && sidebarOpen && (
              <header className="fixed top-4 right-4 z-50">
                <ThemeSelector />
              </header>
            )}

            {/* Header avec navigation - visible uniquement quand la sidebar est fermée */}
            <PersistentSidebarHeader isVisible={headerVisible} />

            {/* Sidebar à gauche */}
            <PersistentSidebar onToggle={handleSidebarToggle} />
          </div>
        </div>

        {/* Contenu principal avec marge adaptative */}
        <main className="flex-1 overflow-auto w-full h-full">
          <div
            className="transition-all duration-500 ease-in-out"
            style={{
              minHeight: 'calc(100vh - 1rem)',
              marginLeft: isMounted && sidebarOpen ? '384px' : '0', // 384px = 96rem (w-96)
            }}
          >
            {children}
          </div>
        </main>
      </div>
    )
  },
  // Autoriser toujours les re-rendus pour la mise à jour des enfants
  () => false,
)

SidebarLayout.displayName = 'SidebarLayout'
