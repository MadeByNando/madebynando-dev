'use client'

import React from 'react'
import { AnimateOnScroll } from '@/components/AnimateOnScroll'
import { Button } from '@/ThemeComponents/atoms/Button'
import { Icon } from '@/ThemeComponents/atoms/Icon'
import { HeroCardContent } from '@/ThemeComponents/molecules/HeroCardContent'
import { CTAButton } from '../atoms/CTAButton'

export const HeroSection = () => {
  return (
    <section className="hero-gradient overflow-hidden pt-2 px-2">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="relative">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <AnimateOnScroll delay="delay-100">
              <div className="mb-16 lg:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-foreground">
                  L&apos;IA au service <br />
                  <span className="gradient-text">de votre productivité</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-10 max-w-lg">
                  Des solutions d&apos;automatisation intelligentes conçues pour les PME
                  ambitieuses. Nous transformons vos processus métiers avec une approche pragmatique
                  et mesurable.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <CTAButton href="#contact">Réservez un audit gratuit</CTAButton>
                  <Button
                    href="#services"
                    variant="secondary"
                    className="bg-background text-foreground border border-border transition-transform hover:scale-105"
                  >
                    Nos solutions
                  </Button>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay="delay-200">
              <div className="relative">
                <div className="animate-float">
                  <HeroCardContent />
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
