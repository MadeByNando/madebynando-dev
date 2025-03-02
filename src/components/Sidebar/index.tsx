'use client'

import React, { useState } from 'react'

type SidebarProps = {
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="relative">
      {/* Bouton de toggle qui reste visible même quand la sidebar est fermée */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute z-10 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md 
                   flex items-center justify-center transition-all duration-300 ease-in-out
                   ${isOpen ? 'right-4 top-4' : 'left-4 top-4'}`}
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>

      {/* Sidebar avec animation */}
      <aside
        className={`h-screen bg-gray-100 dark:bg-gray-800 flex flex-col transition-all duration-300 ease-in-out
                   ${isOpen ? 'w-96 opacity-100' : 'w-0 opacity-0 overflow-hidden'} 
                   ${className}`}
      >
        <nav className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="mb-4 flex items-center space-x-4">
            <img src="/images/logo-mbn.png" alt="Logo" className="h-12 w-12" />
            <h1 className="text-lg font-semibold">
              Fernando
              <br />
              Pinho
            </h1>
          </div>
          <ul className="space-y-2">
            <li>
              <a
                href="/services"
                className="block py-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/a-propos"
                className="block py-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                À propos
              </a>
            </li>
            <li>
              <a
                href="/cas-etude"
                className="block py-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Cas d'étude
              </a>
            </li>
            <li>
              <a
                href="/posts"
                className="block py-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="block py-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Me contacter
              </a>
            </li>
          </ul>
        </nav>

        {/* Emplacement pour l'interface de chat IA */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Chat IA</h3>
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Interface de chat ici</p>
          </div>
        </div>
      </aside>
    </div>
  )
}
