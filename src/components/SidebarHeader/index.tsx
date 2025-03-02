'use client'

import React, { useState } from 'react'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { useAnimation } from '@/providers/AnimationContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type SidebarHeaderProps = {
  isVisible: boolean
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isVisible }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  // Utiliser le contexte d'animation
  const { shouldAnimate, isPageTransitioning } = useAnimation()
  // Obtenir le chemin actuel pour mettre en évidence le lien actif
  const pathname = usePathname()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // Classes pour les animations
  const transitionClass =
    shouldAnimate && !isPageTransitioning
      ? 'transition-all duration-300 ease-in-out'
      : 'transition-none'

  // Calculer les classes pour l'animation de visibilité
  const visibilityClasses = isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'

  // Fonction pour déterminer si un lien est actif
  const isLinkActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  // Classe pour les liens actifs
  const activeLinkClass = 'text-blue-600 dark:text-blue-400 font-medium'
  const linkClass =
    'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
  const mobileLinkClass =
    'block py-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
  const mobileActiveLinkClass = 'block py-1 text-blue-600 dark:text-blue-400 font-medium'

  return (
    <header
      className={`fixed top-0 right-0 z-40 p-4 bg-white dark:bg-gray-800 shadow-md rounded-bl-lg ${transitionClass} ${visibilityClasses}`}
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
              <li>
                <Link
                  href="/services"
                  className={isLinkActive('/services') ? activeLinkClass : linkClass}
                  prefetch={true}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className={isLinkActive('/a-propos') ? activeLinkClass : linkClass}
                  prefetch={true}
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/cas-etude"
                  className={isLinkActive('/cas-etude') ? activeLinkClass : linkClass}
                  prefetch={true}
                >
                  Cas d'étude
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className={isLinkActive('/posts') ? activeLinkClass : linkClass}
                  prefetch={true}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={isLinkActive('/contact') ? activeLinkClass : linkClass}
                  prefetch={true}
                >
                  Me contacter
                </Link>
              </li>
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
              <li>
                <Link
                  href="/services"
                  className={isLinkActive('/services') ? mobileActiveLinkClass : mobileLinkClass}
                  prefetch={true}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className={isLinkActive('/a-propos') ? mobileActiveLinkClass : mobileLinkClass}
                  prefetch={true}
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/cas-etude"
                  className={isLinkActive('/cas-etude') ? mobileActiveLinkClass : mobileLinkClass}
                  prefetch={true}
                >
                  Cas d'étude
                </Link>
              </li>
              <li>
                <Link
                  href="/posts"
                  className={isLinkActive('/posts') ? mobileActiveLinkClass : mobileLinkClass}
                  prefetch={true}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={isLinkActive('/contact') ? mobileActiveLinkClass : mobileLinkClass}
                  prefetch={true}
                >
                  Me contacter
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
            <ThemeSelector />
          </div>
        </div>
      )}
    </header>
  )
}
