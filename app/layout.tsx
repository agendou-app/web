import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

import { Toaster } from '@/components/providers/toaster'

import NextAuthSessionProvider from '@/components/providers/session-provider'

import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Agendou',
  description: 'Agendamentos ',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider messages={messages}>
          <NextAuthSessionProvider>
            <main>{children}</main>
            <Toaster />
          </NextAuthSessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
