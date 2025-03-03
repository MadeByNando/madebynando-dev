'use client'

import React, { useState, useCallback, memo, useEffect, useRef } from 'react'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { useAnimation } from '@/providers/AnimationContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type SidebarHeaderProps = {
  isVisible: boolean
}

// Utiliser memo pour éviter les re-rendus inutiles
export const SidebarHeader: React.FC<SidebarHeaderProps> = memo(({ isVisible }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState(false)
  // Référence pour stocker l'état de visibilité précédent
  const prevIsVisibleRef = useRef<boolean>(false)
  // Référence pour suivre si une transition est en cours
  const isTransitioningRef = useRef<boolean>(false)

  // Utiliser le contexte d'animation
  const { visitedRoutes, hasVisitedRoute } = useAnimation()
  const pathname = usePathname()
  const isNewRoute = !hasVisitedRoute(pathname)

  // S'assurer que le composant est monté avant d'appliquer les animations
  useEffect(() => {
    setIsMounted(true)
    if (isVisible) {
      setShouldRender(true)
      prevIsVisibleRef.current = isVisible
    }
  }, [])

  // Détecter les changements d'état de visibilité
  useEffect(() => {
    if (prevIsVisibleRef.current !== isVisible) {
      isTransitioningRef.current = true

      // Réinitialiser l'état de transition après la durée de l'animation
      const timer = setTimeout(() => {
        isTransitioningRef.current = false
      }, 500)

      return () => clearTimeout(timer)
    }

    // Mettre à jour la référence pour le prochain changement
    prevIsVisibleRef.current = isVisible
  }, [isVisible])

  // Gérer l'animation de disparition en utilisant un événement d'animation
  useEffect(() => {
    if (!headerRef.current) return

    const handleAnimationEnd = (e: AnimationEvent) => {
      if (e.animationName.includes('slideOutToRight') && !isVisible) {
        setShouldRender(false)
      }

      if (e.animationName.includes('slideInFromRight') && isVisible) {
        setShouldRender(true)
      }
    }

    headerRef.current.addEventListener('animationend', handleAnimationEnd)

    return () => {
      headerRef.current?.removeEventListener('animationend', handleAnimationEnd)
    }
  }, [isVisible])

  // Mettre à jour shouldRender quand isVisible change
  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
    }
    // Ne pas désactiver le rendu ici pour permettre à l'animation de sortie de s'exécuter
  }, [isVisible])

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
  }, [])

  // Décider si l'animation doit être jouée
  const shouldPlayAnimation = isMounted && (isNewRoute || isTransitioningRef.current)

  // Déterminer la classe d'animation à utiliser
  const animationClass = isMounted
    ? isVisible
      ? shouldPlayAnimation
        ? 'header-slide-in'
        : ''
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
  const activeLinkClass = 'text-blue-600 dark:text-blue-400 font-medium'
  const linkClass =
    'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
  const mobileLinkClass =
    'block py-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
  const mobileActiveLinkClass = 'block py-1 text-blue-600 dark:text-blue-400 font-medium'

  // Liens de navigation
  const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/a-propos', label: 'À propos' },
    { href: '/cas-etude', label: "Cas d'étude" },
    { href: '/posts', label: 'Blog' },
    { href: '/contact', label: 'Me contacter' },
  ]

  // Si le composant n'est pas monté ou ne doit pas être rendu, ne rien afficher
  if (!isMounted || (!shouldRender && !isVisible)) {
    return null
  }

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 right-0 z-40 p-4 bg-white dark:bg-gray-800 shadow-md rounded-bl-lg ${animationClass} will-change-transform will-change-opacity`}
      style={{
        transformOrigin: 'right top',
        // S'assurer que le header est visible si nécessaire sans animation
        transform: isVisible && !animationClass ? 'translateX(0)' : undefined,
        opacity: isVisible && !animationClass ? 1 : undefined,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center mr-6">
          <img src="/images/logo-mbn.png" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="font-semibold text-gray-800 dark:text-gray-200 hidden sm:inline">
            Fernando Pinho
          </span>
        </div>

        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav>
            <ul className="flex space-x-6">
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
          <ThemeSelector />
        </div>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="md:hidden mt-4 py-2 border-t border-gray-200 dark:border-gray-700">
          <nav>
            <ul className="space-y-2">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={isLinkActive(href) ? mobileActiveLinkClass : mobileLinkClass}
                    prefetch={true}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
            <ThemeSelector />
          </div>
        </div>
      )}
    </header>
  )
})
