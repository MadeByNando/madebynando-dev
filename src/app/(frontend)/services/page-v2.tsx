import React from 'react'
import { AnimateOnScroll } from '@/components/AnimateOnScroll'

export const metadata = {
  title: 'Services | Made by Nando',
  description: 'Découvrez les services proposés par Made by Nando',
}

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-12 px-2">
      {/* Introduction */}
      <section className="mb-24">
        <AnimateOnScroll>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Une IA qui s'adapte à vous, pas l'inverse</h1>
            <p className="text-muted-foreground text-lg">
              Nos services sont conçus pour résoudre vos problèmes réels, avec des solutions IA
              concrètes, personnalisées et évolutives.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Services Grid */}
      <section className="mb-24">
        <AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <AnimateOnScroll delay="delay-100">
              <div className="service-card h-full">
                <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-primary/10 flex items-center justify-center mb-6">
                  <span className="text-primary text-xl">🎤</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Agents vocaux IA</h3>
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
            </AnimateOnScroll>

            {/* Service 2 */}
            <AnimateOnScroll delay="delay-200">
              <div className="service-card h-full">
                <div className="w-14 h-14 rounded-xl bg-cyan-50 dark:bg-accent/10 flex items-center justify-center mb-6">
                  <span className="text-primary text-xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Automatisation CRM</h3>
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
            </AnimateOnScroll>

            {/* Service 3 */}
            <AnimateOnScroll delay="delay-300">
              <div className="service-card h-full">
                <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-primary/10 flex items-center justify-center mb-6">
                  <span className="text-primary text-xl">✍️</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
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
            </AnimateOnScroll>

            {/* Service 4 */}
            <AnimateOnScroll delay="delay-100">
              <div className="service-card h-full">
                <div className="w-14 h-14 rounded-xl bg-cyan-50 dark:bg-accent/10 flex items-center justify-center mb-6">
                  <span className="text-primary text-xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
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
            </AnimateOnScroll>

            {/* Service 5 */}
            <AnimateOnScroll delay="delay-200">
              <div className="service-card h-full">
                <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-primary/10 flex items-center justify-center mb-6">
                  <span className="text-primary text-xl">🔧</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Solutions IA sur mesure
                </h3>
                <p className="text-muted-foreground mb-6">
                  Vous avez une idée précise ou un problème atypique ? On conçoit l'outil IA parfait
                  pour y répondre.
                </p>
                <p className="text-muted-foreground italic mb-6">
                  Ex. : Une entreprise de maintenance industrielle prédit les pannes machines grâce
                  à un modèle d'analyse de capteurs.
                </p>
                <p className="text-muted-foreground">
                  Innovation : nous repoussons les limites de l'IA pour vos besoins uniques.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Service 6 */}
            <AnimateOnScroll delay="delay-300">
              <div className="service-card h-full">
                <div className="w-14 h-14 rounded-xl bg-cyan-50 dark:bg-accent/10 flex items-center justify-center mb-6">
                  <span className="text-primary text-xl">🎓</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Formations et accompagnement IA
                </h3>
                <p className="text-muted-foreground mb-6">
                  Vos équipes sont formées à comprendre, utiliser et améliorer les outils IA mis en
                  place. Ateliers pratiques, coaching ou documentation à la carte.
                </p>
                <p className="text-muted-foreground italic mb-6">
                  Ex. : Formation du service client à l'utilisation et l'optimisation d'un agent IA
                  en moins d'une demi-journée.
                </p>
                <p className="text-muted-foreground">
                  Pédagogie : nous adaptons notre approche à votre niveau technique.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </AnimateOnScroll>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <AnimateOnScroll>
          <h2 className="text-3xl font-bold mb-6">
            Pas besoin de tout faire tout de suite. Commençons par une idée simple.
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vous avez un cas d'usage en tête, ou juste une intuition ? Échangeons. En quelques
            minutes, on peut souvent identifier un projet à fort potentiel. Et si vous hésitez
            encore, on vous propose un diagnostic gratuit pour vous aiguiller.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-primary text-primary-foreground font-medium py-3 px-6 rounded-full hover:bg-primary/90 transition-colors"
          >
            Discutons de votre projet
            <span className="ml-2">➡️</span>
          </a>
        </AnimateOnScroll>
      </section>
    </div>
  )
}
