import { SignUpForm } from './sign-up-form'
import { Button } from '@/components/ui/button'
import { EnterIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'

export default function SignUp() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col justify-center px-4 py-8">
      <div>
        <Link href="/" className="block pb-8 sm:hidden">
          <Image
            src="/agendou-logo-black.png"
            alt="Illustration"
            width={800}
            height={800}
            quality={1}
            priority={true}
            className="w-32"
          />
        </Link>
        <Button variant="ghost" asChild className="absolute right-4 top-4">
          <Link href="sign-in">
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
