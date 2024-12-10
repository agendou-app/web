import { api } from "@/utils/api";

interface SignInData {
  email: string
  password: string
}
export async function signInService(data: SignInData) {
  return api.post('/sessions', data)
}