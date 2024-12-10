import { SignUpForm } from './form'
import { Button } from '@/components/ui/button'
import { EnterIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router'

export function SignUpPage() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col justify-center px-4 py-8">
      <div>
        <Link to="/" className="block pb-8 sm:hidden">
          <img
            src="/agendou-logo-black.png"
            alt="Illustration"
            className="w-32"
          />
        </Link>
        <Button variant="ghost" asChild className="absolute right-4 top-4">
          <Link to="/sign-in">
            <EnterIcon />
            Login
          </Link>
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <SignUpForm />
      </div>
    </div>
  )
}