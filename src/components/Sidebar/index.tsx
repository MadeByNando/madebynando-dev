'use client'

import React, { useEffect, useCallback, useState, useRef } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Types pour les props
type SidebarProps = {
  className?: string
  onToggle?: (isOpen: boolean) => void
}

// Liens de navigation partagés
const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/cas-etude', label: "Cas d'étude" },
  { href: '/posts', label: 'Blog' },
  { href: '/contact', label: 'Me contacter' },
]

/**
 * Composant Sidebar - Barre latérale principale de l'application
 * Persiste entre les navigations grâce à React.memo
 */
export const Sidebar = React.memo(
  ({ className, onToggle }: SidebarProps) => {
    // États et hooks
    const [isMounted, setIsMounted] = useState(false)
    const [isOpen, setIsOpen] = useLocalStorage<boolean>('sidebarOpen', true)
    const pathname = usePathname()
    const mountedRef = useRef(false)
    const [isDarkMode, setIsDarkMode] = useState(false)

    // Initialisation au montage côté client
    useEffect(() => {
      if (!mountedRef.current) {
        mountedRef.current = true
        setIsMounted(true)
      }

      // Détecter le mode sombre initial
      if (typeof window !== 'undefined') {
        setIsDarkMode(document.documentElement.classList.contains('dark'))
      }
    }, [])

    // Observer les changements de thème
    useEffect(() => {
      if (typeof window === 'undefined') return

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class' && mutation.target === document.documentElement) {
            setIsDarkMode(document.documentElement.classList.contains('dark'))
          }
        })
      })

      observer.observe(document.documentElement, { attributes: true })

      return () => {
        observer.disconnect()
      }
    }, [])

    // Toggle de la sidebar avec mémorisation
    const toggleSidebar = useCallback(() => {
      setIsOpen(!isOpen)
    }, [isOpen, setIsOpen])

    // Notifier le parent des changements d'état
    useEffect(() => {
      if (onToggle && isMounted) {
        onToggle(isOpen)
      }
    }, [isOpen, onToggle, isMounted])

    // Classes et styles partagés
    const transitionClass = 'transition-all duration-500 ease-in-out'

    // Fonction pour déterminer si un lien est actif
    const isLinkActive = useCallback(
      (href: string) => pathname === href || pathname.startsWith(`${href}/`),
      [pathname],
    )

    // Classes pour les liens
    const linkBaseClass = 'block py-1 text-gray-300 hover:text-blue-400 transition-colors'
    const activeLinkClass = 'text-blue-400 font-medium'

    return (
      <div className="relative">
        {/* Sidebar avec animation conditionnelle */}
        <aside
          className={`fixed top-0 left-0 h-screen flex flex-col ${transitionClass}
                    ${isMounted && isOpen ? 'w-96 opacity-100' : 'w-0 opacity-0 overflow-hidden'} 
                    ${className || ''}`}
          style={{
            background: isDarkMode
              ? 'linear-gradient(to bottom, #0a1929, #1a365d)' // Dégradé pour le mode sombre
              : 'linear-gradient(to bottom, #1e3a8a, #3b82f6)', // Dégradé pour le mode clair
          }}
        >
          {/* Bouton de fermeture à l'intérieur de la sidebar */}
          {isMounted && isOpen && (
            <button
              onClick={toggleSidebar}
              className={`absolute z-10 p-2 rounded-full bg-gray-700 shadow-md 
                      flex items-center justify-center ${transitionClass}
                      right-4 top-4`}
              aria-label="Fermer le menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-300"
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

          <nav className="p-4">
            <div className="mb-4 flex items-center space-x-4">
              <img src="/images/logo-mbn.png" alt="Logo" className="h-12 w-12" />
              <h1 className="text-lg font-semibold text-white">
                Fernando
                <br />
                Pinho
              </h1>
            </div>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={isLinkActive(href) ? activeLinkClass : linkBaseClass}
                    prefetch={true}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Interface de chat IA */}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 text-white">Chat IA</h3>
            <div className="h-40 bg-gray-700 rounded-md flex items-center justify-center">
              <p className="text-gray-400">Interface de chat ici</p>
            </div>
          </div>
        </aside>

        {/* Bouton d'ouverture - visible uniquement quand la sidebar est fermée */}
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
  // Ne re-rendre que si les props importantes changent
  (prevProps, nextProps) =>
    prevProps.onToggle === nextProps.onToggle && prevProps.className === nextProps.className,
)

Sidebar.displayName = 'Sidebar'
