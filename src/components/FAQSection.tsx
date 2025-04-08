'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'
// Import icons if using a library
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface FAQItemProps {
  question: string
  answer: React.ReactNode // Allow JSX in answer
  isOpen: boolean
  onToggle: () => void
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="rounded-xl overflow-hidden border border-border">
      <button
        className="faq-toggle w-full flex justify-between items-center p-6 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-foreground">{question}</h3>
        {/* Replace with actual icon */}
        {/* {isOpen ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />} */}
        <span
          className={cn('text-gray-400 transition-transform duration-300', isOpen && 'rotate-180')}
        >
          ▼
        </span>{' '}
        {/* Placeholder with rotation */}
      </button>
      {/* Conditional rendering with CSS transition (height 0 to auto) might be smoother */}
      {/* Or use a library like headlessui/react for Disclosure */}
      <div className={cn('faq-content px-6 pb-6', !isOpen && 'hidden')}>
        <div className="text-gray-600 dark:text-gray-400">{answer}</div>
      </div>
    </div>
  )
}

interface FAQSectionProps {
  faqs: Array<{ question: string; answer: React.ReactNode }>
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 bg-card">
      {' '}
      {/* Use bg-card or bg-background based on design */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Questions fréquentes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nous répondons à vos interrogations les plus courantes
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">Vous avez d&apos;autres questions ?</p>
          <a
            href="#contact"
            className="btn-primary bg-foreground hover:bg-gray-800 text-background font-medium py-3.5 px-8 rounded-full inline-flex items-center"
          >
            Contactez-nous directement
            {/* Replace with actual icon */}
            {/* <FaComments className="ml-2" /> */}
            <span className="ml-2">💬</span> {/* Placeholder */}
          </a>
        </div>
      </div>
    </section>
  )
}
