import React from 'react'
import { Sidebar } from '../../Sidebar'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

type SidebarLayoutProps = {
  children: React.ReactNode
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* ThemeSelector en position fixed en haut à droite */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeSelector />
      </div>

      {/* Sidebar à gauche */}
      <Sidebar />

      {/* Contenu principal */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
