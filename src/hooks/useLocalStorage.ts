'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'

// Hook personnalisé pour gérer l'état persistant avec localStorage
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((val: T) => T)) => void] {
  // État pour stocker notre valeur
  // Utiliser une fonction d'initialisation pour éviter de lire localStorage à chaque rendu
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialiser l'état depuis localStorage uniquement côté client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        console.log(`Reading localStorage for key: ${key}`)
        const item = window.localStorage.getItem(key)
        if (item) {
          const parsedValue = JSON.parse(item)
          console.log(`Found value in localStorage for key ${key}:`, parsedValue)
          setStoredValue(parsedValue)
        } else {
          console.log(
            `No value found in localStorage for key ${key}, using initialValue:`,
            initialValue,
          )
        }
        setIsInitialized(true)
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error)
      }
    }
  }, [key, initialValue])

  // Mémoriser la fonction setValue pour éviter de créer une nouvelle fonction à chaque rendu
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Permettre à la valeur d'être une fonction pour avoir la même API que useState
        const valueToStore = value instanceof Function ? value(storedValue) : value
        console.log(`Setting localStorage for key ${key} to:`, valueToStore)

        // Sauvegarder l'état
        setStoredValue(valueToStore)

        // Sauvegarder dans localStorage uniquement côté client
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        // En cas d'erreur lors de la sauvegarde
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue],
  )

  return [storedValue, setValue]
}
