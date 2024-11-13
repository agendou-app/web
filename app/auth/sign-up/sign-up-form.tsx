'use client'

import { useTranslations } from 'next-intl'
import SignUpFormSchema from '@/schemas/sign-up'

import Link from 'next/link'

import { useForm } from 'react-hook-form'
import zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { ArrowRightIcon, SymbolIcon } from '@radix-ui/react-icons'
import { ArrowLeft } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSignUpSteps } from '@/hooks/use-sign-up-toasts'
import useApiRequest from '@/hooks/use-api-request'

export function SignUpForm() {
  const router = useRouter()

  const t = useTranslations('pages.auth.sign_up')
  const formSchema = SignUpFormSchema(t)

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { step, nextStep, backStep, handleKeyDown } = useSignUpSteps(form)
  const { isLoading, request } = useApiRequest<zod.infer<typeof formSchema>>()

  const onSubmit = async (data: zod.infer<typeof formSchema>) => {
    try {
      await request('POST', '/users', data)

      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      router.replace('/calendar')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card className="mx-auto max-w-sm border-none shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t('title')}</CardTitle>
        <CardDescription>
          {step === 'name' && <span>{t('form.subtitles.name')}</span>}

          {step === 'email' && <span>{t('form.subtitles.email')}</span>}

          {step === 'password' && <span>{t('form.subtitles.password')}</span>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={handleKeyDown}
          >
            <div className="grid gap-4">
              {step === 'name' && (
                <>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder={t('form.fields.name.placeholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" className="w-full" onClick={nextStep}>
                    {t('form.buttons.next')}
                    <ArrowRightIcon />
                  </Button>
                </>
              )}

              {step === 'email' && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder={t('form.fields.email.placeholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-4">
                    <Button type="button" variant="ghost" onClick={backStep}>
                      <ArrowLeft />
                      {t('form.buttons.return')}
                    </Button>
                    <Button type="button" className="w-full" onClick={nextStep}>
                      {t('form.buttons.next')}
                      <ArrowRightIcon />
                    </Button>
                  </div>
                </>
              )}

              {step === 'password' && (
                <>
                  <>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t('form.fields.password.label')}
                          </FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t('form.fields.confirm_password.label')}
                          </FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-4">
                      <Button type="button" variant="ghost" onClick={backStep}>
                        <ArrowLeft />
                        {t('form.buttons.return')}
                      </Button>
                      <Button type="submit" className="w-full">
                        {!isLoading ? (
                          <span>{t('form.buttons.sign_up')}</span>
                        ) : (
                          <SymbolIcon className="animate-spin" />
                        )}
                      </Button>
                    </div>
                  </>
                </>
              )}
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              {t('form.footer.you_agree')}{' '}
              <Link href="#" className="underline">
                {t('form.footer.terms_of_service')}
              </Link>{' '}
              {t('form.footer.and')}{' '}
              <Link href="#" className="underline">
                {t('form.footer.privacy_of_policy')}
              </Link>
              .
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
