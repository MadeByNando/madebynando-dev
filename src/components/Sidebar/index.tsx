'use client'

import React, { useEffect, useCallback, useState, useRef } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Types pour les props
type SidebarProps = {
  className?: string
  onToggle?: (isOpen: boolean) => void
}

// Liens de navigation partagés avec icônes
const NAV_LINKS = [
  {
    href: '/services',
    label: 'Services',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    href: '/a-propos',
    label: 'À propos',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  },
  {
    href: '/cas-etude',
    label: "Cas d'étude",
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
  {
    href: '/posts',
    label: 'Blog',
    icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
  },
  {
    href: '/contact',
    label: 'Me contacter',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
]

/**
 * Composant Sidebar - Barre latérale principale de l'application
 * Persiste entre les navigations grâce à React.memo
 */
export const Sidebar = React.memo(
  ({ className, onToggle }: SidebarProps) => {
    // États et hooks
    const [isMounted, setIsMounted] = useState(false)
    const [isOpen, setIsOpen] = useLocalStorage<boolean>('sidebarOpen', true)
    const pathname = usePathname()
    const mountedRef = useRef(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [shouldRender, setShouldRender] = useState(false)
    const sidebarRef = useRef<HTMLElement>(null)

    // Messages de chat initiaux
    const [chatMessages, setChatMessages] = useState([
      {
        id: 1,
        sender: 'recruiter',
        text: "Bonjour, je suis un responsable design d'une entreprise tech. Je vous ai repéré grâce à vos travaux sur Dribbble. Avez-vous un emploi actuellement ?",
        time: '09:34',
      },
      {
        id: 2,
        sender: 'user',
        text: "Bonjour, je ne travaille pas encore, quelqu'un peut-il m'aider ?",
        time: '09:45',
      },
      {
        id: 3,
        sender: 'recruiter',
        text: "Souhaiteriez-vous travailler dans mon entreprise ? Envoyez-moi d'abord votre portfolio.",
        time: '09:56',
      },
      {
        id: 4,
        sender: 'user',
        text: "D'accord, je vais vous l'envoyer.",
        time: '10:02',
      },
      {
        id: 5,
        sender: 'user',
        type: 'file',
        fileName: 'Portfolio.pdf',
        fileSize: '3 MB',
        time: '10:06',
      },
      {
        id: 6,
        sender: 'recruiter',
        text: "Merci pour votre portfolio. J'ai pu voir vos travaux et je suis impressionné par votre créativité et votre sens du détail.",
        time: '10:15',
      },
      {
        id: 7,
        sender: 'user',
        text: 'Je vous remercie ! Je suis content que mon travail vous plaise.',
        time: '10:18',
      },
      {
        id: 8,
        sender: 'recruiter',
        text: 'Nous recherchons actuellement un designer UI/UX pour notre équipe produit. Seriez-vous intéressé par ce poste ?',
        time: '10:22',
      },
      {
        id: 9,
        sender: 'user',
        text: "Oui, je suis très intéressé ! Pouvez-vous me donner plus de détails sur le poste et l'entreprise ?",
        time: '10:25',
      },
      {
        id: 10,
        sender: 'recruiter',
        text: 'Bien sûr. Notre entreprise développe des solutions SaaS pour le secteur de la santé. Le poste consiste à concevoir des interfaces utilisateur intuitives pour nos applications web et mobiles. Nous offrons un salaire compétitif, des avantages sociaux et la possibilité de travailler à distance.',
        time: '10:30',
      },
      {
        id: 11,
        sender: 'user',
        text: "Cela semble parfait pour moi. J'ai de l'expérience dans la conception d'interfaces pour des applications complexes et j'apprécie particulièrement les projets qui ont un impact social positif.",
        time: '10:35',
      },
      {
        id: 12,
        sender: 'recruiter',
        text: 'Excellent ! Pourrions-nous organiser un entretien vidéo cette semaine pour discuter plus en détail ?',
        time: '10:38',
      },
    ])

    // États pour le chat
    const [message, setMessage] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const chatContainerRef = useRef<HTMLDivElement>(null)

    // Fonction pour envoyer un message
    const sendMessage = () => {
      if (message.trim() === '') return

      // Ajouter le message de l'utilisateur
      const newUserMessage = {
        id: chatMessages.length + 1,
        sender: 'user',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setChatMessages([...chatMessages, newUserMessage])
      setMessage('')

      // Simuler une réponse après un délai
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)

        // Ajouter une réponse du recruteur
        const newRecruiterMessage = {
          id: chatMessages.length + 2,
          sender: 'recruiter',
          text: "Merci pour votre message. Je vais l'examiner et revenir vers vous rapidement.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }

        setChatMessages((prevMessages) => [...prevMessages, newRecruiterMessage])
      }, 2000)
    }

    // Faire défiler vers le bas lorsque de nouveaux messages sont ajoutés
    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      }
    }, [chatMessages, isTyping])

    // Gérer l'envoi du message avec la touche Entrée
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        sendMessage()
      }
    }

    // Initialisation au montage côté client
    useEffect(() => {
      if (!mountedRef.current) {
        mountedRef.current = true
        setIsMounted(true)
        setShouldRender(isOpen)
      }

      // Détecter le mode sombre initial
      if (typeof window !== 'undefined') {
        setIsDarkMode(document.documentElement.classList.contains('dark'))
      }
    }, [isOpen])

    // Gestion de l'animation de disparition
    useEffect(() => {
      if (!sidebarRef.current) return

      const handleAnimationEnd = (e: AnimationEvent) => {
        if (e.animationName.includes('slideOutToLeft') && !isOpen) {
          setShouldRender(false)
        }
      }

      sidebarRef.current.addEventListener('animationend', handleAnimationEnd)
      return () => {
        sidebarRef.current?.removeEventListener('animationend', handleAnimationEnd)
      }
    }, [isOpen])

    // Observer les changements de thème
    useEffect(() => {
      if (typeof window === 'undefined') return

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class' && mutation.target === document.documentElement) {
            setIsDarkMode(document.documentElement.classList.contains('dark'))
          }
        })
      })

      observer.observe(document.documentElement, { attributes: true })

      return () => {
        observer.disconnect()
      }
    }, [])

    // Toggle de la sidebar avec mémorisation
    const toggleSidebar = useCallback(() => {
      const newState = !isOpen
      setIsOpen(newState)
      if (newState) {
        setShouldRender(true)
      }
    }, [isOpen, setIsOpen])

    // Notifier le parent des changements d'état
    useEffect(() => {
      if (onToggle && isMounted) {
        onToggle(isOpen)
      }
    }, [isOpen, onToggle, isMounted])

    // Détermine la classe d'animation à appliquer
    const animationClass = isMounted
      ? isOpen
        ? 'sidebar-slide-in'
        : shouldRender
          ? 'sidebar-slide-out'
          : 'hidden'
      : 'hidden'

    // Fonction pour déterminer si un lien est actif
    const isLinkActive = useCallback(
      (href: string) => pathname === href || pathname.startsWith(`${href}/`),
      [pathname],
    )

    // Classes pour les liens
    const linkBaseClass =
      'flex items-center space-x-3 py-3 px-4 w-full text-gray-300 hover:text-white hover:bg-blue-600/20 transition-colors rounded-xl'
    const activeLinkClass =
      'flex items-center space-x-3 py-3 px-4 w-full text-white font-medium bg-blue-600/20 rounded-xl'

    // Si la sidebar ne doit pas être rendue, ne rien afficher
    if (!shouldRender && !isOpen) {
      return (
        <div className="relative">
          {/* Bouton d'ouverture - visible uniquement quand la sidebar est fermée */}
          {isMounted && !isOpen && (
            <button
              onClick={toggleSidebar}
              className="fixed z-10 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md 
                      flex items-center justify-center transition-all duration-300 ease-in-out
                      left-4 top-4"
              aria-label="Ouvrir le menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      )
    }

    return (
      <div className="relative">
        {/* Sidebar avec animation de déplacement latéral */}
        <aside
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-screen flex flex-col w-96 ${animationClass} ${className || ''}`}
          style={{
            background: isDarkMode
              ? 'linear-gradient(to bottom, #0a1929, #1a365d)' // Dégradé pour le mode sombre
              : 'linear-gradient(to bottom, #1e3a8a, #3b82f6)', // Dégradé pour le mode clair
          }}
        >
          {/* Bouton de fermeture à l'intérieur de la sidebar */}
          {isMounted && (
            <button
              onClick={toggleSidebar}
              className="absolute z-10 p-2 rounded-full bg-gray-700 shadow-md 
                      flex items-center justify-center transition-all duration-300 ease-in-out
                      right-4 top-4"
              aria-label="Fermer le menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          <nav className="p-4 flex flex-col h-full">
            <div className="mb-8 mt-2 px-2 flex items-center space-x-4">
              <img src="/images/logo-mbn.png" alt="Logo" className="h-10 w-10" />
              <h1 className="text-lg text-white">Fernando Pinho</h1>
            </div>

            <ul className="space-y-1">
              {NAV_LINKS.map(({ href, label, icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={isLinkActive(href) ? activeLinkClass : linkBaseClass}
                    prefetch={true}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d={icon}
                      />
                    </svg>
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Interface de chat IA */}
            <div className="flex-grow relative mt-4" style={{ height: 'calc(100vh - 180px)' }}>
              {/* Zone de messages avec défilement */}
              <div
                className="absolute top-0 left-0 right-0 bottom-20 overflow-y-auto p-4 space-y-4"
                ref={chatContainerRef}
              >
                {/* Messages de chat */}
                <div className="flex flex-col space-y-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end self-end' : ''} max-w-[85%]`}
                    >
                      {msg.type === 'file' ? (
                        <div className="bg-blue-500/90 backdrop-blur-sm text-white p-3 rounded-xl flex items-center space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <div>
                            <p className="text-sm font-medium">{msg.fileName}</p>
                            <p className="text-xs">{msg.fileSize}</p>
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div
                          className={`${
                            msg.sender === 'user'
                              ? 'bg-gray-600/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl'
                              : 'bg-blue-600/90 backdrop-blur-sm rounded-t-xl rounded-br-xl'
                          } text-white p-3`}
                        >
                          <p className="text-sm">{msg.text}</p>
                        </div>
                      )}
                      <span className="text-xs text-gray-400 mt-1">{msg.time}</span>
                    </div>
                  ))}

                  {/* Indicateur de frappe - visible uniquement quand isTyping est true */}
                  {isTyping && (
                    <div className="flex flex-col max-w-[85%]">
                      <div className="bg-blue-600/90 backdrop-blur-sm text-white p-3 rounded-t-xl rounded-br-xl flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: '0ms' }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: '150ms' }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: '300ms' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Input style Siri - Fixé en bas avec position absolue */}
              <div className="absolute bottom-0 left-0 right-0 h-20 backdrop-blur-md px-3 pb-3">
                <div className="relative mx-0">
                  {/* Conteneur avec bordure dégradée */}
                  <div className="relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 p-[2px] shadow-lg">
                    {/* Effet de glow */}
                    <div className="absolute inset-0 blur-[2px] bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 opacity-50"></div>

                    {/* Fond de l'input */}
                    <div className="relative bg-gray-800/90 backdrop-blur-md rounded-full">
                      <div className="flex items-center">
                        {/* Icône à gauche */}
                        <div className="absolute left-3 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 flex items-center justify-center shadow-md">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              className="w-5 h-5 text-white"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Input text */}
                        <input
                          type="text"
                          placeholder="Parle moi ici..."
                          className="w-full py-3 pl-16 pr-12 bg-transparent text-white border-none focus:outline-none"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />

                        {/* Bouton d'envoi */}
                        <div className="absolute right-3 flex items-center justify-center">
                          <button
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center transition-transform hover:scale-105"
                            onClick={sendMessage}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              className="w-4 h-4 text-white"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 12h14M12 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Bouton d'ouverture - visible uniquement quand la sidebar est fermée */}
        {isMounted && !isOpen && (
          <button
            onClick={toggleSidebar}
            className="fixed z-10 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md 
                    flex items-center justify-center transition-all duration-300 ease-in-out
                    left-4 top-4"
            aria-label="Ouvrir le menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    )
  },
  // Ne re-rendre que si les props importantes changent
  (prevProps, nextProps) =>
    prevProps.onToggle === nextProps.onToggle && prevProps.className === nextProps.className,
)

Sidebar.displayName = 'Sidebar'
