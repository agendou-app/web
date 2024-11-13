import { SignUpForm } from '@/components/sign-up-form'
import { Button } from '@/components/ui/button'
import { EnterIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default function SignUp() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center px-4">
      <Button variant="ghost" asChild className="absolute right-4 top-4">
        <Link href="sign-in">
          <EnterIcon />
          Login
        </Link>
      </Button>
      <SignUpForm />
    </div>
  )
}
