import React from 'react'
import ContactForm from '@/components/ContactForm'
import { FAQSection } from '@/components/FAQSection'
import { AnimateOnScroll } from '@/components/AnimateOnScroll'
import { HeroSection } from '@/ThemeComponents/organisms/HeroSection'

// Import icons if using a library (example)
// import {
//   FaArrowRight, FaBolt, FaCalendarCheck, FaChartLine, FaCheckCircle, FaChevronDown, FaChevronUp,
//   FaComments, FaDatabase, FaEnvelope, FaFileAlt, FaMagic, FaMicrophoneAlt, FaPuzzlePiece,
//   FaRobot, FaStar, FaSyncAlt, FaUser
// } from 'react-icons/fa'

export const metadata = {
  title: 'madebynando - Automatisation IA pour PME',
  description:
    "Solutions d'automatisation IA sur mesure pour PME. Gagnez en productivité et concentrez-vous sur votre cœur de métier.",
}

// Define FAQ data here or fetch from an API/CMS
const faqs = [
  {
    question: 'Est-ce adapté à ma petite entreprise ?',
    answer: (
      <>
        Absolument ! Nous travaillons principalement avec des PME et avons conçu nos offres pour
        être accessibles et rentables même pour les structures de petite taille. Nos solutions sont
        modulaires - vous commencez par automatiser une ou deux tâches critiques, puis vous étendez
        progressivement. Le premier audit est d\'ailleurs gratuit, ce qui vous permet de voir
        concrètement ce que nous pourrions faire pour vous sans engagement.
      </>
    ),
  },
  {
    question: 'Combien ça coûte ?',
    answer: (
      <>
        Nos tarifs commencent à 490€/mois pour une solution de base, et évoluent en fonction de la
        complexité de vos besoins. Ce qui est important de comprendre :
        <br />
        <br />
        1) Nous commençons toujours par un audit gratuit qui vous donnera une estimation précise.
        <br />
        2) Nous priorisons les solutions qui s&apos;autofinancent rapidement par les gains de temps
        ou d&apos;efficacité qu&apos;elles génèrent.
        <br />
        3) Pas de contrat long terme - vous pouvez arrêter à tout moment (même si 95% de nos clients
        renouvellent).
      </>
    ),
  },
  {
    question: 'Et si ça ne fonctionne pas ?',
    answer: (
      <>
        C&apos;est justement pour cela que nous procédons par étapes :
        <br />
        <br />
        - Phase 1 : Audit gratuit pour valider la faisabilité
        <br />
        - Phase 2 : Prototype rapide avec des objectifs clairs et mesurables
        <br />
        - Phase 3 : Déploiement complet seulement si les résultats du prototype sont concluants
        <br />
        <br />
        De plus, nous incluons dans tous nos contrats une garantie de résultats : si les objectifs
        définis ensemble ne sont pas atteints après 3 mois, nous remboursons la différence ou
        travaillons gratuitement jusqu&apos;à ce qu&apos;ils le soient.
      </>
    ),
  },
  {
    question: 'Comment ça se passe techniquement ?',
    answer: (
      <>
        Nous faisons tout pour que la transition soit la plus douce possible :
        <br />
        <br />
        - Nous nous intégrons à vos outils existants (CRM, logiciels métiers...)
        <br />
        - Nous fournissons des interfaces simplifiées adaptées à vos besoins
        <br />
        - Formation initiale + support continu pour vos équipes
        <br />
        - Documentation claire et tutoriels vidéo
        <br />
        <br />
        L&apos;objectif est que vos collaborateurs gagnent du temps avec nos solutions, pas
        qu&apos;ils passent des heures à apprendre de nouveaux outils complexes.
      </>
    ),
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      <div className="section-divider"></div>

      {/* Services Section */}
      <section id="services" className="py-24 bg-background px-2">
        {' '}
        {/* Adjusted background */}
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Solutions sur mesure
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nous automatisons les tâches répétitives pour que vous puissiez vous concentrer sur
                ce qui compte vraiment.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <AnimateOnScroll delay="delay-100">
                <div className="service-card h-full">
                  {' '}
                  {/* Removed bg-white, uses .service-card base */}
                  <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-primary/10 flex items-center justify-center mb-6">
                    {/* <FaMicrophoneAlt className="text-primary text-xl" /> */}
                    <span className="text-primary text-xl">🎤</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Assistants vocaux IA
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Standard téléphonique intelligent capable de gérer les appels entrants, de
                    prendre des rendez-vous et de répondre aux questions fréquentes.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <span>Découvrir</span>
                    {/* <FaArrowRight className="ml-2 mt-0.5" /> */}
                    <span className="ml-2 mt-0.5">➡️</span>
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Service 2 */}
              <AnimateOnScroll delay="delay-200">
                <div className="service-card h-full">
                  <div className="w-14 h-14 rounded-xl bg-cyan-50 dark:bg-accent/10 flex items-center justify-center mb-6">
                    {/* <FaEnvelope className="text-primary-400 text-xl" /> Use primary or accent */}
                    <span className="text-primary text-xl">✉️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Automatisation email
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Système de relance et de tri automatique des emails avec personnalisation
                    contextuelle pour un service client réactif.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <span>Découvrir</span>
                    {/* <FaArrowRight className="ml-2 mt-0.5" /> */}
                    <span className="ml-2 mt-0.5">➡️</span>
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Service 3 */}
              <AnimateOnScroll delay="delay-300">
                <div className="service-card h-full">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-primary/10 flex items-center justify-center mb-6">
                    {/* <FaFileAlt className="text-primary text-xl" /> */}
                    <span className="text-primary text-xl">📄</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Génération de documents
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Création automatique de contrats, devis et rapports à partir de vos templates,
                    avec vérification humaine systématique.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <span>Découvrir</span>
                    {/* <FaArrowRight className="ml-2 mt-0.5" /> */}
                    <span className="ml-2 mt-0.5">➡️</span>
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Service 4 */}
              <AnimateOnScroll delay="delay-100">
                <div className="service-card h-full">
                  <div className="w-14 h-14 rounded-xl bg-cyan-50 dark:bg-accent/10 flex items-center justify-center mb-6">
                    {/* <FaChartLine className="text-primary-400 text-xl" /> Use primary or accent */}
                    <span className="text-primary text-xl">📈</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Analyse de données</h3>
                  <p className="text-muted-foreground mb-6">
                    Extraction et synthèse automatisée des insights clés à partir de vos données
                    commerciales et opérationnelles.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <span>Découvrir</span>
                    {/* <FaArrowRight className="ml-2 mt-0.5" /> */}
                    <span className="ml-2 mt-0.5">➡️</span>
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Service 5 */}
              <AnimateOnScroll delay="delay-200">
                <div className="service-card h-full">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-primary/10 flex items-center justify-center mb-6">
                    {/* <FaDatabase className="text-primary text-xl" /> */}
                    <span className="text-primary text-xl">💾</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Gestion CRM intelligente
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Enrichissement automatique des fiches clients, scoring des leads et suggestions
                    d&apos;actions prioritaires.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <span>Découvrir</span>
                    {/* <FaArrowRight className="ml-2 mt-0.5" /> */}
                    <span className="ml-2 mt-0.5">➡️</span>
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Service 6 */}
              <AnimateOnScroll delay="delay-300">
                <div className="service-card h-full">
                  <div className="w-14 h-14 rounded-xl bg-cyan-50 dark:bg-accent/10 flex items-center justify-center mb-6">
                    {/* <FaCalendarCheck className="text-primary-400 text-xl" /> Use primary or accent */}
                    <span className="text-primary text-xl">🗓️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Optimisation de planning
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Algorithmes d&apos;optimisation des rendez-vous et des ressources pour maximiser
                    votre productivité quotidienne.
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <span>Découvrir</span>
                    {/* <FaArrowRight className="ml-2 mt-0.5" /> */}
                    <span className="ml-2 mt-0.5">➡️</span>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="text-center mt-16">
              <a
                href="#contact"
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                Besoin d&apos;une solution spécifique ? Parlons-en
                {/* <FaArrowRight className="ml-2 mt-0.5" /> */}
                <span className="ml-2 mt-0.5">➡️</span>
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Why Us Section */}
      <section className="py-24 bg-card px-2">
        {' '}
        {/* Adjusted background */}
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
              <div className="mb-16 lg:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
                  Notre approche <br />
                  <span className="gradient-text">différente</span>
                </h2>

                <div className="space-y-8">
                  <div className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-primary/10 flex items-center justify-center">
                        {/* <FaBolt className="text-primary" /> */}
                        <span className="text-primary">⚡</span>
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Résultats rapides
                      </h3>
                      <p className="text-muted-foreground">
                        Nous priorisons les &quot;Quick Wins&quot; pour que vous voyiez des
                        bénéfices concrets dès les premières semaines.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-lg bg-cyan-50 dark:bg-accent/10 flex items-center justify-center">
                        {/* <FaSyncAlt className="text-primary-400" /> Use primary or accent */}
                        <span className="text-primary">🔄</span>
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Modèle évolutif
                      </h3>
                      <p className="text-muted-foreground">
                        Abonnement flexible qui s&apos;adapte à votre croissance, sans engagement
                        long terme.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-primary/10 flex items-center justify-center">
                        {/* <FaPuzzlePiece className="text-primary" /> */}
                        <span className="text-primary">🧩</span>
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Intégration transparente
                      </h3>
                      <p className="text-muted-foreground">
                        Nos solutions s&apos;adaptent à vos outils existants pour une transition en
                        douceur.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {/* Use bg-background or bg-muted/10 etc for contrast */}
                <div className="bg-background p-10 rounded-2xl border border-border">
                  <div className="flex items-center mb-8">
                    <div className="w-14 h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                      {/* <FaStar className="text-xl" /> */}
                      <span className="text-xl">⭐</span>
                    </div>
                    <div className="ml-6">
                      <h3 className="font-semibold text-foreground text-xl">
                        Garantie de résultats
                      </h3>
                      <p className="text-muted-foreground">Notre engagement envers vous</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {/* <FaCheckCircle className="text-primary" /> */}
                        <span className="text-primary">✔️</span>
                      </div>
                      <p className="ml-4 text-muted-foreground">
                        <span className="font-medium text-foreground">Pas de jargon technique</span>{' '}
                        - Nous parlons votre langage et nous concentrons sur ce qui compte pour
                        votre business.
                      </p>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {/* <FaCheckCircle className="text-primary" /> */}
                        <span className="text-primary">✔️</span>
                      </div>
                      <p className="ml-4 text-muted-foreground">
                        <span className="font-medium text-foreground">Humain avant tout</span> -
                        L&apos;IA est un outil, vos équipes restent au cœur de la stratégie.
                      </p>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {/* <FaCheckCircle className="text-primary" /> */}
                        <span className="text-primary">✔️</span>
                      </div>
                      <p className="ml-4 text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Éthique et confidentialité
                        </span>
                        - Vos données sont protégées et nous utilisons uniquement des modèles
                        responsables.
                      </p>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {/* <FaCheckCircle className="text-primary" /> */}
                        <span className="text-primary">✔️</span>
                      </div>
                      <p className="ml-4 text-muted-foreground">
                        <span className="font-medium text-foreground">Suivi mensuel</span> -
                        Rapports clairs et ajustements réguliers pour maximiser votre ROI.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Method Section */}
      {/* Add timeline-container class to parent grid for connector lines */}
      <section id="methode" className="py-24 bg-background px-2">
        {' '}
        {/* Adjusted background */}
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Notre méthode</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Un processus clair et transparent pour des résultats rapides et durables
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 timeline-container relative">
              {' '}
              {/* Added relative and timeline-container */}
              {/* Step 1 */}
              <div className="relative timeline-step">
                {' '}
                {/* Add timeline-step here */}
                <div className="bg-card p-8 rounded-2xl h-full border border-border">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-primary/10 text-primary flex items-center justify-center mb-6 text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Audit & Diagnostic</h3>
                  <p className="text-muted-foreground mb-6">
                    Analyse approfondie de vos processus pour identifier les opportunités
                    d&apos;automatisation les plus impactantes.
                  </p>
                  <div>
                    <span className="inline-block bg-blue-50 dark:bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                      Sans engagement
                    </span>
                  </div>
                </div>
              </div>
              {/* Step 2 */}
              <div className="relative timeline-step">
                {' '}
                {/* Add timeline-step here */}
                <div className="bg-card p-8 rounded-2xl h-full border border-border">
                  <div className="w-14 h-14 rounded-xl bg-cyan-50 dark:bg-accent/10 text-primary flex items-center justify-center mb-6 text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Prototype rapide</h3>
                  <p className="text-muted-foreground mb-6">
                    Déploiement en 2-4 semaines d&apos;une première solution concrète pour valider
                    l&apos;approche et mesurer l&apos;impact.
                  </p>
                  <div>
                    <span className="inline-block bg-cyan-50 dark:bg-accent/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                      Résultats rapides
                    </span>
                  </div>
                </div>
              </div>
              {/* Step 3 */}
              <div className="relative">
                {' '}
                {/* No timeline-step on last item */}
                <div className="bg-card p-8 rounded-2xl h-full border border-border">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-primary/10 text-primary flex items-center justify-center mb-6 text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Optimisation continue
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Accompagnement mensuel pour affiner les solutions, former vos équipes et
                    déployer de nouvelles automatisations.
                  </p>
                  <div>
                    <span className="inline-block bg-blue-50 dark:bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                      Flexible
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="mt-16 text-center">
              <a
                href="#contact"
                className="btn-primary bg-foreground hover:bg-gray-800 text-background font-medium py-3.5 px-8 rounded-full inline-flex items-center"
              >
                Démarrer avec l&apos;étape 1{/* <FaArrowRight className="ml-2" /> */}
                <span className="ml-2">➡️</span>
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* FAQ Section - Using the Client Component */}
      <AnimateOnScroll>
        <FAQSection faqs={faqs} />
      </AnimateOnScroll>

      {/* CTA Section - Using the Client Component */}
      <AnimateOnScroll>
        <ContactForm />
      </AnimateOnScroll>
    </>
  )
}
