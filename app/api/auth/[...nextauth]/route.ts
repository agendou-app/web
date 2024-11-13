import { api } from '@/lib/axios'
import { AxiosError } from 'axios'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          const response = await api.post(
            `${process.env.NEXT_PUBLIC_API_URL}/sessions`,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
          )

          const user = response.data

          if (user) {
            return user
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data.message)
          }
        }
      },
    }),
  ],

  pages: {
    signIn: '/auth/sign-in',
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user)
      return token
    },
    async session({ session, token }) {
      session = token.user as any
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
