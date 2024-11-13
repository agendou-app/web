import zod from 'zod'
import { useTranslations } from 'next-intl'

const formSchema = (
  t: ReturnType<typeof useTranslations<'pages.auth.sign_up'>>,
) =>
  zod
    .object({
      name: zod
        .string()
        .min(3, t('form.fields.name.validation.minimum_characters'))
        .max(50, t('form.fields.name.validation.maximum_characters'))
        .regex(
          /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/,
          t('form.fields.name.validation.only_letters_spaces'),
        ),
      email: zod.string().email(t('form.fields.email.validation.valid_email')),
      password: zod
        .string()
        .min(6, t('form.fields.password.validation.at_least_6_characteres')),
      confirmPassword: zod.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ['confirmPassword'], // Indica que o erro está no campo confirmPassword
      message: t(
        'form.fields.confirm_password.validation.passwords_must_match',
      ),
    })

export default formSchema
