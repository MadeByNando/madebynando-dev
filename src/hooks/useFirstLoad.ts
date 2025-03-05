'use client'

import { useState, useEffect } from 'react'

// Clé utilisée pour le localStorage
const FIRST_LOAD_KEY = 'site_firstload'
// Valeur pour indiquer que la page a déjà été chargée
const VISITED_VALUE = 'visited'

/**
 * Hook personnalisé pour détecter si c'est la première visite de l'utilisateur sur le site
 * @returns {boolean} True si c'est le premier chargement, false sinon
 */
export function useFirstLoad(): boolean {
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      // Vérifier si la clé existe dans localStorage
      const hasVisitedBefore = localStorage.getItem(FIRST_LOAD_KEY) === VISITED_VALUE

      if (!hasVisitedBefore) {
        // Premier chargement du site, marquer comme visité
        localStorage.setItem(FIRST_LOAD_KEY, VISITED_VALUE)
        setIsFirstLoad(true)

        // Afficher dans la console pour débogage
        console.log('Premier chargement du site détecté')
      } else {
        // Ce n'est pas le premier chargement
        setIsFirstLoad(false)
        console.log('Site déjà visité précédemment')
      }
    } catch (error) {
      // En cas d'erreur avec localStorage (e.g. en navigation privée)
      console.error("Erreur lors de l'accès à localStorage:", error)
      setIsFirstLoad(true) // Par défaut, considérer comme premier chargement
    }
  }, [])

  return isFirstLoad
}

/**
 * Réinitialise l'état de première visite (utile pour les tests)
 */
export function resetFirstLoadState(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(FIRST_LOAD_KEY)
    console.log('État de première visite réinitialisé')
  } catch (error) {
    console.error("Erreur lors de la réinitialisation de l'état:", error)
  }
}
