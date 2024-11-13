import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { api } from '@/lib/axios'

type HttpMethod = 'POST' | 'PUT' | 'GET' | 'DELETE'

interface UseApiRequestReturn<T> {
  data: T | null
  isLoading: boolean
  error: string | null
  request: (method: HttpMethod, url: string, data?: T) => Promise<void>
}

function useApiRequest<T>() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<T | null>(null)

  const request = async (
    method: HttpMethod,
    url: string,
    requestData?: T,
  ): Promise<void> => {
    setIsLoading(true)
    setData(null)

    try {
      let response
      switch (method) {
        case 'POST':
          response = await api.post(url, requestData)
          break
        case 'PUT':
          response = await api.put(url, requestData)
          break
        case 'GET':
          response = await api.get(url)
          break
        case 'DELETE':
          response = await api.delete(url)
          break
        default:
          throw new Error('Método não suportado')
      }

      setData(response.data)
    } catch (err) {
      let errorMessage = 'Ocorreu um erro desconhecido'

      if (axios.isAxiosError(err)) {
        if (err.code === 'ERR_NETWORK') {
          errorMessage = 'Não foi possível se conectar com o servidor!'
        } else {
          errorMessage = err.response?.data?.message || errorMessage
        }
      } else if (err instanceof Error) {
        errorMessage = err.message
      }

      toast({
        variant: 'destructive',
        title: 'Erro',
        description: errorMessage,
      })

      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return { data, isLoading, request }
}

export default useApiRequest
