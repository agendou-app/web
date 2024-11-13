import axios from 'axios'
import { signOut } from 'next-auth/react'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      signOut({ callbackUrl: '/auth/sign-in', redirect: true })
    }

    return Promise.reject(error)
  },
)
