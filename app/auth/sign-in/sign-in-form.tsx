'use client'

import { useTranslations } from 'next-intl'
import SignInFormSchema from '@/schemas/sign-in'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
import { signIn } from 'next-auth/react'
import { SymbolIcon } from '@radix-ui/react-icons'
import { useToast } from '@/hooks/use-toast'

export function SignInForm() {
  const t = useTranslations('pages.auth.sign_in')
  const formSchema = SignInFormSchema(t)

  const { toast } = useToast()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: zod.infer<typeof formSchema>) {
    setIsLoading(true)

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: result.error,
      })
      setIsLoading(false)
      return
    }

    router.replace('/calendar')
    setIsLoading(false)
  }

  return (
    <Card className="mx-auto max-w-sm border-none shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t('title')}</CardTitle>
        <CardDescription>{t('subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.fields.email.label')}</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.fields.password.label')}</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={isLoading} type="submit" className="w-full">
                {!isLoading ? (
                  <span>{t('form.buttons.submit')}</span>
                ) : (
                  <SymbolIcon className="animate-spin" />
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {t('form.footer.dont_have_account')}{' '}
              <Link href="sign-up" className="underline">
                {t('form.footer.sign_up')}
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
