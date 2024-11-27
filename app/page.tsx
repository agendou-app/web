import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Agendou - Landing Page</h1>
      <Button>
        <Link href="/auth/sign-in">Entrar</Link>
      </Button>
    </div>
  )
}
