'use client'

import { useState, useEffect } from 'react'

// Hook personnalisé pour gérer l'état persistant avec localStorage
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // État pour stocker notre valeur
  // Passer la fonction d'initialisation à useState pour qu'elle ne s'exécute qu'une fois
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Initialiser avec la valeur de localStorage ou la valeur initiale
  useEffect(() => {
    // Vérifier si le code s'exécute côté client
    if (typeof window !== 'undefined') {
      try {
        // Récupérer la valeur depuis localStorage
        const item = window.localStorage.getItem(key)
        // Analyser la valeur stockée ou retourner la valeur initiale
        if (item) {
          setStoredValue(JSON.parse(item))
        }
      } catch (error) {
        // En cas d'erreur, utiliser la valeur initiale
        console.error(`Error reading localStorage key "${key}":`, error)
      }
    }
  }, [key, initialValue])

  // Fonction pour mettre à jour la valeur dans localStorage et l'état
  const setValue = (value: T) => {
    try {
      // Permettre à la valeur d'être une fonction pour avoir la même API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Sauvegarder l'état
      setStoredValue(valueToStore)
      // Sauvegarder dans localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      // En cas d'erreur lors de la sauvegarde
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}
