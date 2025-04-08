'use client'

import React from 'react'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/utilities/ui' // Assuming you have a utility for merging class names

interface AnimateOnScrollProps {
  children: React.ReactNode
  className?: string // Allow passing additional classes
  delay?: string // Allow custom delay (e.g., 'delay-100', 'delay-200')
  threshold?: number // Intersection Observer threshold (0 to 1)
  triggerOnce?: boolean // Only trigger the animation once
}

export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  className,
  delay = 'delay-100', // Default delay
  threshold = 0.1, // Trigger when 10% of the element is visible
  triggerOnce = true, // Default to triggering only once
}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  })

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out', // Base transition classes
        delay, // Apply delay
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8', // Animate opacity and position
        className, // Merge any additional classes passed as props
      )}
    >
      {children}
    </div>
  )
}
