'use client'

import React from 'react'
import { Icon } from '@/ThemeComponents/atoms/Icon'

export const HeroCardContent = () => {
  return (
    <div className="relative bg-card p-8 rounded-3xl shadow-xl border border-border">
      <div className="flex justify-between items-center mb-8">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-blue-400 flex items-center justify-center">
          <Icon emoji="🤖" className="text-white text-xl" />
        </div>
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
          <Icon emoji="👤" className="text-muted-foreground text-xl" />
        </div>
      </div>
      <div className="h-48 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl flex items-center justify-center mb-8">
        <div className="text-center p-6">
          <Icon emoji="✨" className="text-4xl text-primary mb-4 block" />
          <h3 className="font-medium text-lg text-foreground mb-2">Synergie Humain-IA</h3>
          <p className="text-muted-foreground text-sm">
            L&apos;excellence opérationnelle par la complémentarité
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-1/2 pr-2">
          <div className="bg-muted/50 dark:bg-muted/20 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Tâches automatisées</p>
            <p className="font-semibold text-primary">+80%</p>
          </div>
        </div>
        <div className="w-1/2 pl-2">
          <div className="bg-muted/50 dark:bg-muted/20 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Gain de temps</p>
            <p className="font-semibold text-primary">15h/semaine</p>
          </div>
        </div>
      </div>
      {/* Decorative Blobs */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full opacity-50 blur-3xl -z-10"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full opacity-50 blur-3xl -z-10"></div>
    </div>
  )
}
