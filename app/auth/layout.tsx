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
      <Image
        src="/agendou-logo-black.png"
        alt="Logo"
        width={800}
        height={800}
        quality={1}
        priority={true}
        className="absolute left-5 top-5 z-10 w-32"
      />
      <div className="hidden flex-1 border-r bg-zinc-100 p-4 sm:block"></div>
      <main className="flex-1">{children}</main>
    </div>
  )
}
