import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React, { Suspense } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { SidebarLayout } from '@/components/Layouts/SidebarLayout'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { AnimationProvider } from '@/providers/AnimationContext'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

// Composant de chargement pour les transitions de page
const PageLoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="animate-pulse text-gray-500 dark:text-gray-400">Chargement...</div>
  </div>
)

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="fr" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AnimationProvider>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />

            <SidebarLayout>
              <Suspense fallback={<PageLoadingFallback />}>{children}</Suspense>
            </SidebarLayout>
          </AnimationProvider>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
