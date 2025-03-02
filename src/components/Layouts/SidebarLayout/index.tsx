'use client'

import React, { useEffect } from 'react'
import { Sidebar } from '../../Sidebar'
import { SidebarHeader } from '../../SidebarHeader'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { usePathname } from 'next/navigation'

type SidebarLayoutProps = {
  children: React.ReactNode
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  // Utiliser notre hook personnalisé pour persister l'état de la sidebar
  const [sidebarOpen, setSidebarOpen] = useLocalStorage<boolean>('sidebarOpen', true)
  const pathname = usePathname()

  // Effet pour éviter les réinitialisations lors des changements de page
  useEffect(() => {
    // Cette fonction vide permet de s'assurer que le composant ne se réinitialise pas
    // lors des changements de page, car elle crée une dépendance au pathname
    // sans déclencher de logique supplémentaire
  }, [pathname])

  const handleSidebarToggle = (isOpen: boolean) => {
    setSidebarOpen(isOpen)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Wrapper pour la navigation persistante */}
      <div className="fixed inset-0 z-40 pointer-events-none">
        <div className="pointer-events-auto">
          {/* ThemeSelector en position fixed en haut à droite - visible seulement quand la sidebar est ouverte */}
          {sidebarOpen && (
            <header className="fixed top-4 right-4 z-50">
              <ThemeSelector />
            </header>
          )}

          {/* Header avec navigation - visible seulement quand la sidebar est fermée */}
          <SidebarHeader isVisible={!sidebarOpen} />

          {/* Sidebar à gauche */}
          <Sidebar onToggle={handleSidebarToggle} />
        </div>
      </div>

      {/* Contenu principal */}
      <main className="flex-1 overflow-auto w-full h-full pt-2 pl-2 pr-2">
        <div
          className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-96' : 'ml-0'}`}
        >
          {children}
        </div>
      </main>
    </div>
  )
}
