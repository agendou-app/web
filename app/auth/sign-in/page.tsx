import Image from 'next/image'

import { SignInForm } from './sign-in-form'
import Link from 'next/link'

export default function Page() {
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
      </div>
      <div className="flex flex-1 items-center justify-center">
        <SignInForm />
      </div>
    </div>
  )
}
