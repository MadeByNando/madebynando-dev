import React from 'react'

type SidebarProps = {
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <aside className={`h-screen w-64 bg-gray-100 dark:bg-gray-800 flex flex-col ${className}`}>
      <div className="flex-grow p-4">
        {/* Emplacement pour les onglets de navigation */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Navigation</h3>
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Navigation ici</p>
          </div>
        </div>
      </div>

      {/* Emplacement pour l'interface de chat IA */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-2">Chat IA</h3>
        <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Interface de chat ici</p>
        </div>
      </div>
    </aside>
  )
}
