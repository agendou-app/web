import zod from 'zod'

export const signInFormSchema =
  zod.object({
    email: zod.string().email('Digite um email válido'),
    password: zod
      .string()
      .min(6, 'A senha deve ter no mínimo 6 dígitos'),
  })