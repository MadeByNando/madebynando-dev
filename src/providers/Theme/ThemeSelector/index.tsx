'use client'

import React, { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

import { useTheme } from '..'
import { themeLocalStorageKey } from '../shared'

export const ThemeSelector: React.FC = () => {
  const { setTheme, theme } = useTheme()
  const [value, setValue] = useState<string>('')

  const onThemeToggle = () => {
    const newTheme = value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    setValue(newTheme)
  }

  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'light')
  }, [])

  return (
    <button
      aria-label={`Set ${value === 'light' ? 'dark' : 'light'} theme`}
      onClick={onThemeToggle}
      className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
      style={{
        backgroundColor: value === 'light' ? '#f3f4f6' : '#1f2937',
        borderWidth: '1px',
        borderColor: value === 'light' ? '#e5e7eb' : '#374151',
      }}
    >
      <span
        className={`${
          value === 'light' ? 'translate-x-1' : 'translate-x-7'
        } flex h-6 w-6 items-center justify-center rounded-full shadow-sm transition-transform duration-200 ease-in-out`}
        style={{
          backgroundColor: value === 'light' ? '#ffffff' : '#111827',
        }}
      >
        {value === 'light' ? (
          <Sun className="h-4 w-4 text-yellow-500" />
        ) : (
          <Moon className="h-4 w-4 text-indigo-400" />
        )}
      </span>
    </button>
  )
}
