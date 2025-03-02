import React from 'react'
import { Sidebar } from '../Sidebar'

type SidebarLayoutProps = {
  children: React.ReactNode
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar à gauche */}
      <Sidebar />

      {/* Contenu principal */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
