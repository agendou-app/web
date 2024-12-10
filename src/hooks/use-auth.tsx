import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from 'react'
import { api } from '@/utils/api'
import { AxiosError } from 'axios'

import { signInService } from '@/services/user/sign-in'

interface LoginProps {
  email: string
  password: string
}

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextData {
  isAuthenticated: boolean
  user: User
  isLoading: boolean
  signIn({ email, password }: LoginProps): Promise<string>
  signOut(): void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const STORAGED_TOKEN = '@Agendou:token'
const STORAGED_USER = '@Agendou:user'

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({} as User)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function loadStoragedDate() {
      const storagedToken = localStorage.getItem(STORAGED_TOKEN)
      const storagedUser = localStorage.getItem(STORAGED_USER)

      if (storagedToken && storagedUser) {
        api.defaults.headers.common.Authorization = `Bearer ${storagedToken}`

        setIsAuthenticated(true)
        setUser(JSON.parse(storagedUser))
      }
    }

    loadStoragedDate()
  }, [])

  async function signIn({ email, password }: LoginProps) {
    setIsLoading(true)

    try {
      const response = await signInService({ email, password })
      setIsAuthenticated(true)
      localStorage.setItem(STORAGED_TOKEN, response.data.token)
      localStorage.setItem(STORAGED_USER, JSON.stringify(response.data.user))

      setUser(response.data.user)

      api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`

      return response.data.message
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data.message)
      } else {
        throw new Error("Não foi possível entrar")
      }
    } finally {
      setIsLoading(false)
    }
  }

  function signOut() {
    localStorage.removeItem(STORAGED_TOKEN)
    localStorage.removeItem(STORAGED_USER)
    setUser({} as User)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}