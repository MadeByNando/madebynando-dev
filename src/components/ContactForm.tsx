'use client'

import React from 'react'
// Import icons if using a library like react-icons
// import { FaCalendarAlt } from 'react-icons/fa'

export default function ContactForm() {
  // TODO: Implement form submission logic
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted')
    // Add your form submission logic here (e.g., API call)
  }

  return (
    // Apply the custom .cta-section class for the gradient background
    <section id="contact" className="cta-section py-24 px-2">
      <div className="max-w-7xl mx-auto px-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Side Content */}
          <div className="mb-16 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Prêt à automatiser <br />
              votre entreprise ?
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-lg">
              Réservez un appel découverte gratuit avec Fernando Pinho, fondateur de madebynando,
              pour évaluer ensemble comment l&apos;IA peut transformer votre entreprise.
            </p>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                  {/* Replace with actual icon */}
                  {/* <FaCalendarAlt className="text-white text-xl" /> */}
                  <span className="text-white text-xl">📅</span> {/* Placeholder */}
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white">30 minutes en visio</p>
                <p className="text-sm text-blue-200">Sans engagement</p>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div>
            <div className="bg-white p-10 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-semibold text-foreground mb-8">Prendre rendez-vous</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="name-cta"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Votre nom
                  </label>
                  <input
                    type="text"
                    id="name-cta" // Use unique ID if reusing form elements
                    name="name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email-cta"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email-cta"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="company-cta"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Entreprise
                  </label>
                  <input
                    type="text"
                    id="company-cta"
                    name="company"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="message-cta"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Quel est votre principal défi actuel ?
                  </label>
                  <textarea
                    id="message-cta"
                    name="message"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  ></textarea>
                </div>
                {/* Apply the custom .btn-primary class for hover effect */}
                <button
                  type="submit"
                  className="btn-primary w-full bg-foreground hover:bg-gray-800 text-background font-medium py-4 px-6 rounded-lg"
                >
                  Réserver mon audit gratuit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
