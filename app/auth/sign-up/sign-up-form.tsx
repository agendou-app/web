'use client'

import { useTranslations } from 'next-intl'
import SignUpFormSchema from '@/schemas/sign-up'

import { useState } from 'react'
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
import { api } from '@/lib/axios'
import { useToast } from '@/hooks/use-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export function SignUpForm() {
  const t = useTranslations('pages.auth.sign_up')
  const formSchema = SignUpFormSchema(t)

  const { toast } = useToast()
  const router = useRouter()

  const [step, setStep] = useState<'name' | 'email' | 'password'>('name')
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: zod.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      await api.post('/users', data)

      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      router.replace('/calendar')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: error.response?.data.message,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Não foi possível fazer o registro',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function nextStep() {
    if (step === 'name') {
      const nameIsValid = await form.trigger('name')
      if (nameIsValid) {
        setStep('email')
      }
    } else if (step === 'email') {
      const emailIsValid = await form.trigger('email')
      if (emailIsValid) {
        setStep('password')
      }
    }
  }

  function backStep() {
    if (step === 'password') {
      form.setValue('password', '')
      form.setValue('confirmPassword', '')
      setStep('email')
    } else if (step === 'email') {
      form.setValue('email', '')
      setStep('name')
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLFormElement>) {
    if (event.key === 'Enter' && (step === 'name' || step === 'email')) {
      event.preventDefault()
      nextStep()
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
