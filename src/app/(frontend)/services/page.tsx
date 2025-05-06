import React from 'react'
import { AnimateOnScroll } from '@/components/AnimateOnScroll'
import Image from 'next/image'
import { CTAButton } from '@/ThemeComponents/atoms/CTAButton'

export const metadata = {
  title: 'Services | Made by Nando',
  description: 'Découvrez les services proposés par Made by Nando',
}

export default function ServicesPage() {
  return (
    <div className="container mx-auto">
      {/* Hero Section with centered title like homepage */}
      <section className="py-24 px-2">
        <AnimateOnScroll>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-primary mb-3 font-medium">Technology</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Une IA qui <span className="gradient-text">s'adapte à vous</span>, pas l'inverse
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Nos services sont conçus pour résoudre vos problèmes réels, avec des solutions IA
              concrètes, personnalisées et évolutives.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Large illustration */}
        <AnimateOnScroll delay="delay-200">
          <div className="max-w-5xl mx-auto mt-12 mb-24 relative">
            <div className="aspect-video relative rounded-2xl overflow-hidden border border-border">
              <Image
                src="/images/service-content.svg"
                alt="Services IA illustrés"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating elements like in the screenshot */}
            <div className="absolute -top-8 right-16 w-20 h-20 bg-blue-50 dark:bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary text-3xl">🎤</span>
            </div>
            <div className="absolute bottom-12 -left-8 w-16 h-16 bg-cyan-50 dark:bg-accent/10 rounded-full flex items-center justify-center">
              <span className="text-primary text-2xl">📊</span>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Services with alternating layout */}
      <section className="py-12 px-2">
        {/* Service 1 - Left image, Right text */}
        <AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden border border-border">
                <Image
                  src="/images/service-content.svg"
                  alt="Agents vocaux IA"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-blue-50 dark:bg-primary/10 rounded-xl flex items-center justify-center">
                <span className="text-primary text-xl">🎤</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Agents vocaux IA</h3>
              <p className="text-muted-foreground mb-6">
                Des standardistes virtuels disponibles 24/7 pour répondre, orienter ou traiter les
                appels les plus fréquents, même le week-end.
              </p>
              <p className="text-muted-foreground italic mb-6">
                Ex. : Une PME reçoit des appels pour des prises de rendez-vous. Un agent vocal IA
                filtre et planifie automatiquement dans l'agenda de l'équipe.
              </p>
              <p className="text-muted-foreground">
                Sur-mesure : nous adaptons l'agent à votre secteur et à vos besoins spécifiques.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Service 2 - Right image, Left text */}
        <AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="md:order-2">
              <div className="relative">
                <div className="aspect-square relative rounded-2xl overflow-hidden border border-border">
                  <Image
                    src="/images/service-content.svg"
                    alt="Automatisation CRM"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-cyan-50 dark:bg-accent/10 rounded-xl flex items-center justify-center">
                  <span className="text-primary text-xl">📊</span>
                </div>
              </div>
            </div>
            <div className="md:order-1">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Automatisation CRM</h3>
              <p className="text-muted-foreground mb-6">
                Pour ne plus jamais oublier une relance ou une opportunité. L'IA enrichit les
                fiches, automatise les emails, et classe vos prospects selon leur potentiel.
              </p>
              <p className="text-muted-foreground italic mb-6">
                Ex. : Une équipe commerciale reçoit une alerte personnalisée dès qu'un prospect
                ouvre un devis ou visite le site.
              </p>
              <p className="text-muted-foreground">
                Simplicité : nous nous intégrons à votre CRM existant.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Service 3 - Left image, Right text */}
        <AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden border border-border">
                <Image
                  src="/images/service-content.svg"
                  alt="Génération de contenu IA"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-blue-50 dark:bg-primary/10 rounded-xl flex items-center justify-center">
                <span className="text-primary text-xl">✍️</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Génération de contenu IA
              </h3>
              <p className="text-muted-foreground mb-6">
                Produisez plus vite des emails, posts réseaux sociaux, descriptions produits, tout
                en gardant votre ton de marque.
              </p>
              <p className="text-muted-foreground italic mb-6">
                Ex. : L'équipe marketing d'un e-commerce automatise la rédaction de 300 fiches
                produit cohérentes en 2 jours.
              </p>
              <p className="text-muted-foreground">
                Personnalisation : nous entraînons le modèle sur votre style d'écriture.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Service 4 - Right image, Left text */}
        <AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="md:order-2">
              <div className="relative">
                <div className="aspect-square relative rounded-2xl overflow-hidden border border-border">
                  <Image
                    src="/images/service-content.svg"
                    alt="Audit & automatisation"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-cyan-50 dark:bg-accent/10 rounded-xl flex items-center justify-center">
                  <span className="text-primary text-xl">🤖</span>
                </div>
              </div>
            </div>
            <div className="md:order-1">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Audit & automatisation de processus internes
              </h3>
              <p className="text-muted-foreground mb-6">
                On identifie les tâches répétitives (admin, SAV, RH, etc.) et on met en place des
                outils IA ou RPA pour les gérer automatiquement.
              </p>
              <p className="text-muted-foreground italic mb-6">
                Ex. : Une TPE reçoit des factures PDF : l'IA les lit, vérifie les montants et les
                enregistre dans la compta automatiquement.
              </p>
              <p className="text-muted-foreground">
                Efficacité : nous priorisons les tâches à fort impact.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Service 5 - Left image, Right text */}
        <AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden border border-border">
                <Image
                  src="/images/service-content.svg"
                  alt="Solutions IA sur mesure"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-blue-50 dark:bg-primary/10 rounded-xl flex items-center justify-center">
                <span className="text-primary text-xl">🔧</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Solutions IA sur mesure
              </h3>
              <p className="text-muted-foreground mb-6">
                Vous avez une idée précise ou un problème atypique ? On conçoit l'outil IA parfait
                pour y répondre.
              </p>
              <p className="text-muted-foreground italic mb-6">
                Ex. : Une entreprise de maintenance industrielle prédit les pannes machines grâce à
                un modèle d'analyse de capteurs.
              </p>
              <p className="text-muted-foreground">
                Innovation : nous repoussons les limites de l'IA pour vos besoins uniques.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Service 6 - Right image, Left text */}
        <AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <div className="relative">
                <div className="aspect-square relative rounded-2xl overflow-hidden border border-border">
                  <Image
                    src="/images/service-content.svg"
                    alt="Formations et accompagnement IA"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-cyan-50 dark:bg-accent/10 rounded-xl flex items-center justify-center">
                  <span className="text-primary text-xl">🎓</span>
                </div>
              </div>
            </div>
            <div className="md:order-1">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Formations et accompagnement IA
              </h3>
              <p className="text-muted-foreground mb-6">
                Vos équipes sont formées à comprendre, utiliser et améliorer les outils IA mis en
                place. Ateliers pratiques, coaching ou documentation à la carte.
              </p>
              <p className="text-muted-foreground italic mb-6">
                Ex. : Formation du service client à l'utilisation et l'optimisation d'un agent IA en
                moins d'une demi-journée.
              </p>
              <p className="text-muted-foreground">
                Pédagogie : nous adaptons notre approche à votre niveau technique.
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-2 text-center">
        <AnimateOnScroll>
          <h2 className="text-3xl font-bold mb-6">
            Pas besoin de tout faire tout de suite. Commençons par une idée simple.
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vous avez un cas d'usage en tête, ou juste une intuition ? Échangeons. En quelques
            minutes, on peut souvent identifier un projet à fort potentiel. Et si vous hésitez
            encore, on vous propose un diagnostic gratuit pour vous aiguiller.
          </p>
          <CTAButton href="/contact" icon={{ emoji: '➡️' }}>
            Discutons de votre projet
          </CTAButton>
        </AnimateOnScroll>
      </section>
    </div>
  )
}
