import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface Session {
    token: string
    user: {
      id: string
      name: string
      email: string
      role: 'ADMIN' | 'USER'
      phone: string
    }
  }
}
