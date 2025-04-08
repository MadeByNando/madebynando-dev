'use client'

import React from 'react'
import Link from 'next/link'

interface ButtonProps {
  href: string
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  className?: string
}

export const Button: React.FC<ButtonProps> = ({ href, variant, children, className = '' }) => {
  const baseStyle =
    'font-medium py-3.5 px-8 rounded-full text-center inline-flex items-center justify-center'
  const primaryStyle = 'btn-primary bg-foreground hover:bg-gray-800 text-background'
  const secondaryStyle =
    'border border-foreground text-foreground hover:bg-gray-50 dark:hover:bg-gray-800/50'

  const variantStyle = variant === 'primary' ? primaryStyle : secondaryStyle

  return (
    <Link href={href} className={`${baseStyle} ${variantStyle} ${className}`}>
      {children}
    </Link>
  )
}
