'use client'

import React from 'react'

interface IconProps {
  emoji: string
  className?: string
}

export const Icon: React.FC<IconProps> = ({ emoji, className = '' }) => {
  return <span className={className}>{emoji}</span>
}
