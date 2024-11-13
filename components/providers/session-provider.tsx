'use client'

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

interface SessionProviderProps {
  children: ReactNode
}

function NextAuthSessionProvider({ children }: SessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}

export default NextAuthSessionProvider
