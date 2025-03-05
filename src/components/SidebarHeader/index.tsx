'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Types pour les props
type SidebarHeaderProps = {
  isVisible: boolean
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
 * Composant SidebarHeader - Navigation en-tête affichée quand la sidebar est fermée
 * Persiste entre les navigations grâce à React.memo
 */
export const SidebarHeader = React.memo(
  ({ isVisible }: SidebarHeaderProps) => {
    // États et refs
    const [menuOpen, setMenuOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const [shouldRender, setShouldRender] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const headerRef = useRef<HTMLDivElement>(null)
    const mountedRef = useRef(false)
    const pathname = usePathname()

    // Initialisation au montage côté client
    useEffect(() => {
      if (!mountedRef.current) {
        mountedRef.current = true
        setIsMounted(true)
      }

      // Mettre à jour l'état de rendu basé sur la visibilité
      if (isVisible) {
        setShouldRender(true)
      }

      // Détecter le mode sombre initial
      if (typeof window !== 'undefined') {
        setIsDarkMode(document.documentElement.classList.contains('dark'))
      }
    }, [isVisible])

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

    // Gestion de l'animation de disparition
    useEffect(() => {
      if (!headerRef.current) return

      const handleAnimationEnd = (e: AnimationEvent) => {
        if (e.animationName.includes('slideOutToRight') && !isVisible) {
          setShouldRender(false)
        }
      }

      headerRef.current.addEventListener('animationend', handleAnimationEnd)
      return () => {
        headerRef.current?.removeEventListener('animationend', handleAnimationEnd)
      }
    }, [isVisible])

    // Toggle du menu mobile
    const toggleMenu = useCallback(() => {
      setMenuOpen((prev) => !prev)
    }, [])

    // Détermine la classe d'animation à appliquer
    const animationClass = isMounted
      ? isVisible
        ? 'header-slide-in'
        : shouldRender
          ? 'header-slide-out'
          : 'hidden'
      : 'hidden'

    // Fonction pour déterminer si un lien est actif
    const isLinkActive = useCallback(
      (href: string) => pathname === href || pathname.startsWith(`${href}/`),
      [pathname],
    )

    // Classes pour les liens
    const linkClasses = {
      desktop: {
        active: 'text-blue-400 font-medium',
        normal: 'text-gray-300 hover:text-blue-400 transition-colors',
      },
      mobile: {
        active: 'block py-1 text-blue-400 font-medium',
        normal: 'block py-1 text-gray-300 hover:text-blue-400 transition-colors',
      },
    }

    // Si le header ne doit pas être rendu, ne rien afficher
    if (!shouldRender && !isVisible) {
      return null
    }

    return (
      <header
        ref={headerRef}
        className={`fixed top-0 right-0 z-40 p-4 shadow-md rounded-bl-lg ${animationClass} will-change-transform will-change-opacity`}
        style={{
          transformOrigin: 'right top',
          transform: isVisible && !animationClass ? 'translateX(0)' : undefined,
          opacity: isVisible && !animationClass ? 1 : undefined,
          borderTopLeftRadius: '30px',
          borderBottomLeftRadius: '30px',
          background: isDarkMode
            ? 'linear-gradient(to right, #0a1929, #1a365d)' // Dégradé pour le mode sombre
            : 'linear-gradient(to right, #1e3a8a, #3b82f6)', // Dégradé pour le mode clair
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo et nom */}
          <div className="flex items-center mr-6">
            <img src="/images/logo-mbn.png" alt="Logo" className="h-8 w-8 mr-2" />
            <span className="font-semibold text-white hidden sm:inline">Fernando Pinho</span>
          </div>

          {/* Bouton menu hamburger pour mobile */}
          <button
            className="md:hidden p-2 rounded-md text-gray-300 hover:bg-gray-700"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-6">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={
                        isLinkActive(href) ? linkClasses.desktop.active : linkClasses.desktop.normal
                      }
                      prefetch={true}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ThemeSelector />
          </div>
        </div>

        {/* Navigation mobile */}
        {menuOpen && (
          <div className="md:hidden mt-4 py-2 border-t border-gray-700">
            <nav>
              <ul className="space-y-2">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={
                        isLinkActive(href) ? linkClasses.mobile.active : linkClasses.mobile.normal
                      }
                      prefetch={true}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-4 pt-2 border-t border-gray-700">
              <ThemeSelector />
            </div>
          </div>
        )}
      </header>
    )
  },
  // Ne re-rendre que si la visibilité change
  (prevProps, nextProps) => prevProps.isVisible === nextProps.isVisible,
)

SidebarHeader.displayName = 'SidebarHeader'
