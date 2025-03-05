'use client'

import React, { useEffect, useCallback, useState, useRef } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type SidebarProps = {
  className?: string
  onToggle?: (isOpen: boolean) => void
}

// Utiliser React.memo avec une fonction de comparaison pour éviter les re-rendus
// lors des changements de pathname
export const Sidebar = React.memo(
  ({ className, onToggle }: SidebarProps) => {
    // État pour suivre si le composant est monté (côté client)
    const [isMounted, setIsMounted] = useState(false)
    // Utiliser notre hook personnalisé pour persister l'état de la sidebar
    const [isOpen, setIsOpen] = useLocalStorage<boolean>('sidebarOpen', true)
    // Obtenir le chemin actuel pour mettre en évidence le lien actif
    const pathname = usePathname()
    // Référence pour suivre si le composant a déjà été monté
    const mountedRef = useRef(false)

    // S'assurer que le composant est monté avant d'appliquer les états côté client
    useEffect(() => {
      if (!mountedRef.current) {
        mountedRef.current = true
        setIsMounted(true)
        console.log('Sidebar mounted')
      }
    }, [])

    // Mémoriser la fonction de toggle pour éviter les re-rendus inutiles
    const toggleSidebar = useCallback(() => {
      setIsOpen(!isOpen)
    }, [isOpen, setIsOpen])

    // Appeler le callback onToggle lorsque isOpen change
    useEffect(() => {
      if (onToggle && isMounted) {
        onToggle(isOpen)
      }
    }, [isOpen, onToggle, isMounted])

    // Classes pour les animations - transition simple
    const transitionClass = 'transition-all duration-500 ease-in-out'

    // Fonction pour déterminer si un lien est actif
    const isLinkActive = useCallback(
      (href: string) => pathname === href || pathname.startsWith(`${href}/`),
      [pathname],
    )

    // Console.log pour débogage (à retirer en production)
    useEffect(() => {
      console.log('Sidebar rendered, pathname:', pathname)
    }, [pathname])

    // Classes pour les liens
    const activeLinkClass = 'text-blue-600 dark:text-blue-400 font-medium'
    const linkClass =
      'block py-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'

    // Liens de navigation
    const navLinks = [
      { href: '/services', label: 'Services' },
      { href: '/a-propos', label: 'À propos' },
      { href: '/cas-etude', label: "Cas d'étude" },
      { href: '/posts', label: 'Blog' },
      { href: '/contact', label: 'Me contacter' },
    ]

    return (
      <div className="relative">
        {/* Sidebar avec animation conditionnelle */}
        <aside
          className={`fixed top-0 left-0 h-screen bg-gray-100 dark:bg-gray-800 flex flex-col ${transitionClass}
                   ${isMounted && isOpen ? 'w-96 opacity-100' : 'w-0 opacity-0 overflow-hidden'} 
                   ${className}`}
        >
          {/* Bouton de fermeture à l'intérieur de la sidebar quand elle est ouverte */}
          {isMounted && isOpen && (
            <button
              onClick={toggleSidebar}
              className={`absolute z-10 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md 
                     flex items-center justify-center ${transitionClass}
                     right-4 top-4`}
              aria-label="Fermer le menu"
            >
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
            </button>
          )}

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
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={isLinkActive(href) ? activeLinkClass : linkClass}
                    prefetch={true}
                  >
                    {label}
                  </Link>
                </li>
              ))}
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

        {/* Bouton d'ouverture visible uniquement quand la sidebar est fermée */}
        {isMounted && !isOpen && (
          <button
            onClick={toggleSidebar}
            className={`fixed z-10 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md 
                   flex items-center justify-center ${transitionClass}
                   left-4 top-4`}
            aria-label="Ouvrir le menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    )
  },
  (prevProps, nextProps) => {
    // Fonction de comparaison pour éviter les re-rendus lors des changements de route
    // On ne re-render que si les props importantes changent
    return prevProps.onToggle === nextProps.onToggle && prevProps.className === nextProps.className
  },
)

// Ajouter un displayName pour faciliter le débogage
Sidebar.displayName = 'Sidebar'
