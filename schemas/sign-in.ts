import zod from 'zod'
import { useTranslations } from 'next-intl'

const formSchema = (
  t: ReturnType<typeof useTranslations<'pages.auth.sign_in'>>,
) =>
  zod.object({
    email: zod.string().email(t('form.fields.email.validation.valid_email')),
    password: zod
      .string()
      .min(6, t('form.fields.password.validation.at_least_6_characteres')),
  })

export default formSchema
