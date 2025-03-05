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

// Liens de navigation partagés avec icônes
const NAV_LINKS = [
  {
    href: '/services',
    label: 'Services',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    href: '/a-propos',
    label: 'À propos',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  },
  {
    href: '/cas-etude',
    label: "Cas d'étude",
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
  {
    href: '/posts',
    label: 'Blog',
    icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
  },
  {
    href: '/contact',
    label: 'Me contacter',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
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
    const [shouldRender, setShouldRender] = useState(false)
    const sidebarRef = useRef<HTMLElement>(null)

    // Initialisation au montage côté client
    useEffect(() => {
      if (!mountedRef.current) {
        mountedRef.current = true
        setIsMounted(true)
        setShouldRender(isOpen)
      }

      // Détecter le mode sombre initial
      if (typeof window !== 'undefined') {
        setIsDarkMode(document.documentElement.classList.contains('dark'))
      }
    }, [isOpen])

    // Gestion de l'animation de disparition
    useEffect(() => {
      if (!sidebarRef.current) return

      const handleAnimationEnd = (e: AnimationEvent) => {
        if (e.animationName.includes('slideOutToLeft') && !isOpen) {
          setShouldRender(false)
        }
      }

      sidebarRef.current.addEventListener('animationend', handleAnimationEnd)
      return () => {
        sidebarRef.current?.removeEventListener('animationend', handleAnimationEnd)
      }
    }, [isOpen])

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
      const newState = !isOpen
      setIsOpen(newState)
      if (newState) {
        setShouldRender(true)
      }
    }, [isOpen, setIsOpen])

    // Notifier le parent des changements d'état
    useEffect(() => {
      if (onToggle && isMounted) {
        onToggle(isOpen)
      }
    }, [isOpen, onToggle, isMounted])

    // Détermine la classe d'animation à appliquer
    const animationClass = isMounted
      ? isOpen
        ? 'sidebar-slide-in'
        : shouldRender
          ? 'sidebar-slide-out'
          : 'hidden'
      : 'hidden'

    // Fonction pour déterminer si un lien est actif
    const isLinkActive = useCallback(
      (href: string) => pathname === href || pathname.startsWith(`${href}/`),
      [pathname],
    )

    // Classes pour les liens
    const linkBaseClass =
      'flex items-center space-x-3 py-3 px-4 w-full text-gray-300 hover:text-white hover:bg-blue-600/20 transition-colors rounded-xl'
    const activeLinkClass =
      'flex items-center space-x-3 py-3 px-4 w-full text-white font-medium bg-blue-600/20 rounded-xl'

    // Si la sidebar ne doit pas être rendue, ne rien afficher
    if (!shouldRender && !isOpen) {
      return (
        <div className="relative">
          {/* Bouton d'ouverture - visible uniquement quand la sidebar est fermée */}
          {isMounted && !isOpen && (
            <button
              onClick={toggleSidebar}
              className="fixed z-10 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md 
                      flex items-center justify-center transition-all duration-300 ease-in-out
                      left-4 top-4"
              aria-label="Ouvrir le menu"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      )
    }

    return (
      <div className="relative">
        {/* Sidebar avec animation de déplacement latéral */}
        <aside
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-screen flex flex-col w-96 ${animationClass} ${className || ''}`}
          style={{
            background: isDarkMode
              ? 'linear-gradient(to bottom, #0a1929, #1a365d)' // Dégradé pour le mode sombre
              : 'linear-gradient(to bottom, #1e3a8a, #3b82f6)', // Dégradé pour le mode clair
          }}
        >
          {/* Bouton de fermeture à l'intérieur de la sidebar */}
          {isMounted && (
            <button
              onClick={toggleSidebar}
              className="absolute z-10 p-2 rounded-full bg-gray-700 shadow-md 
                      flex items-center justify-center transition-all duration-300 ease-in-out
                      right-4 top-4"
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

          <nav className="p-4 flex flex-col h-full">
            <div className="mb-8 mt-2 px-2 flex items-center space-x-4">
              <img src="/images/logo-mbn.png" alt="Logo" className="h-10 w-10" />
              <h1 className="text-lg text-white">Fernando Pinho</h1>
            </div>

            <ul className="space-y-1 flex-1">
              {NAV_LINKS.map(({ href, label, icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={isLinkActive(href) ? activeLinkClass : linkBaseClass}
                    prefetch={true}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={icon}
                      />
                    </svg>
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Interface de chat IA */}
            <div className="p-4 mt-auto">
              <h3 className="text-lg font-semibold mb-2 text-white">Chat IA</h3>
              <div className="h-40 bg-gray-700 rounded-md flex items-center justify-center">
                <p className="text-gray-400">Interface de chat ici</p>
              </div>
            </div>
          </nav>
        </aside>

        {/* Bouton d'ouverture - visible uniquement quand la sidebar est fermée */}
        {isMounted && !isOpen && (
          <button
            onClick={toggleSidebar}
            className="fixed z-10 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md 
                    flex items-center justify-center transition-all duration-300 ease-in-out
                    left-4 top-4"
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
