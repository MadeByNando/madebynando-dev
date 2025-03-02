'use client'

import React, { useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

import { useTheme } from '..'
import { themeLocalStorageKey } from '../shared'

export const ThemeSelector: React.FC = () => {
  const { setTheme, theme } = useTheme()

  const onThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <button
      aria-label={`Set ${theme === 'light' ? 'dark' : 'light'} theme`}
      onClick={onThemeToggle}
      className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
      style={{
        backgroundColor: theme === 'light' ? '#f3f4f6' : '#1f2937',
        borderWidth: '1px',
        borderColor: theme === 'light' ? '#e5e7eb' : '#374151',
      }}
    >
      <span
        className={`${
          theme === 'light' ? 'translate-x-1' : 'translate-x-7'
        } flex h-6 w-6 items-center justify-center rounded-full shadow-sm transition-transform duration-200 ease-in-out`}
        style={{
          backgroundColor: theme === 'light' ? '#ffffff' : '#111827',
        }}
      >
        {theme === 'light' ? (
          <Sun className="h-4 w-4 text-yellow-500" />
        ) : (
          <Moon className="h-4 w-4 text-indigo-400" />
        )}
      </span>
    </button>
  )
}
