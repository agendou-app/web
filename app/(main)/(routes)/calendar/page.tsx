'use client'

import { Button } from '@/components/ui/button'
import { SymbolIcon } from '@radix-ui/react-icons'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Calendar() {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  function logout() {
    setIsLoading(true)

    signOut({
      redirect: false,
    })

    setIsLoading(false)
    router.replace('/auth/sign-in')
  }

  return (
    <>
      <p>Entrou</p>
      <Button onClick={logout}>
        {!isLoading ? (
          <span>Sair</span>
        ) : (
          <SymbolIcon className="animate-spin" />
        )}
      </Button>
    </>
  )
}
