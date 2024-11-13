import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()

  if (session) {
    redirect('/calendar')
  }

  return (
    <div className="flex">
      <div className="hidden flex-1 items-center justify-center border-r bg-zinc-50 sm:flex">
        <Image
          src="/auth-illustration.svg"
          alt="Illustration"
          width={800}
          height={800}
          quality={1}
          priority={true}
          className="w-[55%] pb-1"
        />
      </div>
      <main className="min-h-screen flex-1">{children}</main>
    </div>
  )
}
