import { signInFormSchema } from '@/schemas/sign-in'

import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'

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
import { Link, useNavigate } from 'react-router'
import { SymbolIcon } from '@radix-ui/react-icons'

export function SignInForm() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { signIn, isLoading } = useAuth()

  const form = useForm<zod.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: zod.infer<typeof signInFormSchema>) {
    try {
      await signIn(data)

      navigate('/schedules')
    } catch (err: any) {
      toast({
        title: err.message,
        variant: "destructive"
      })
    }
  }

  return (
    <Card className="mx-auto max-w-sm border-none shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Entrar</CardTitle>
        <CardDescription>Digite suas credenciais abaixo para acessar sua conta</CardDescription>
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
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="m@exemplo.com" {...field} />
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
                      <FormLabel>Senha</FormLabel>
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
                  <span>Entrar</span>
                ) : (
                  <SymbolIcon className="animate-spin" />
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{' '}
              <Link to="/sign-up" className="underline">
                Cadastre-se
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}