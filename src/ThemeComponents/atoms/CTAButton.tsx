import React from 'react'
import Link from 'next/link'
import { Icon } from './Icon'

interface CTAButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  icon?: React.ReactNode | { emoji: string; className?: string }
  className?: string
  as?: 'a' | 'button'
  type?: 'button' | 'submit' | 'reset'
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  children,
  href,
  onClick,
  icon,
  className = '',
  as = 'a',
  type = 'button',
}) => {
  const baseStyle =
    'btn-primary bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white font-medium py-3.5 px-8 rounded-full inline-flex items-center justify-center transition-transform hover:scale-105'

  const content = (
    <>
      <span>{children}</span>
      {icon &&
        (typeof icon === 'object' && 'emoji' in icon ? (
          <Icon emoji={icon.emoji} className={`ml-2 ${icon.className || ''}`} />
        ) : (
          <span className="ml-2">{icon}</span>
        ))}
    </>
  )

  if (as === 'button') {
    return (
      <button type={type} onClick={onClick} className={`${baseStyle} ${className}`}>
        {content}
      </button>
    )
  }
  // Default: link
  return (
    <Link href={href || '#'} className={`${baseStyle} ${className}`}>
      {content}
    </Link>
  )
}
