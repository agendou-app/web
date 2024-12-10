import { api } from "@/utils/api";

interface SignUpData {
  name: string
  email: string
  password: string
}
export async function signUpService(data: SignUpData) {
  return api.post('/users', data)
}