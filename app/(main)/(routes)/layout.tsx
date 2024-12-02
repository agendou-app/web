import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

import { Navbar } from '@/components/navbar'

interface PrivateLayoutProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession()

  if (!session) {
    redirect('/auth/sign-in')
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
