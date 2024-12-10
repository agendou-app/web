import zod from 'zod'

export const signUpFormSchema =
  zod
    .object({
      name: zod
        .string()
        .min(3, 'No mínimo 3 caracteres')
        .max(50, 'No máximo 50 caracteres')
        .regex(
          /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/,
          'Deve conter apenas letras e espaços',
        ),
      email: zod.string().email('Digite um email válido'),
      password: zod
        .string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres'),
      confirmPassword: zod.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: 'As senhas não são iguais',
    })