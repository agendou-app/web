import { signUpFormSchema } from '@/schemas/sign-up'

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

import { ArrowRightIcon } from '@radix-ui/react-icons'
import { ArrowLeft } from 'lucide-react'
import { useSignUpSteps } from '@/hooks/use-sign-up-steps'
import { Link, useNavigate } from 'react-router'
import { signUpService } from '@/services/user/sign-up'
import { useAuth } from '@/hooks/use-auth'
import { AxiosError } from 'axios'
import { useToast } from '@/hooks/use-toast'

export function SignUpForm() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { signIn } = useAuth()

  const form = useForm<zod.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { step, nextStep, backStep, handleKeyDown } = useSignUpSteps(form)

  const onSubmit = async (data: zod.infer<typeof signUpFormSchema>) => {
    try {
      await signUpService(data)

      await signIn({
        email: data.email,
        password: data.password
      })

      navigate('/schedules')
    } catch (err) {
      if (err instanceof AxiosError) {
        toast({
          title: "Erro",
          description: err.response?.data.message,
          variant: "destructive"
        })
      } else {
        toast({
          title: "Erro",
          description: "Não foi possível fazer o cadastro",
          variant: "destructive"
        })
      }
    }
  }

  return (
    <Card className="mx-auto max-w-sm border-none shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Criar uma conta</CardTitle>
        <CardDescription>
          {step === 'name' && <span>Digite seu nome abaixo para criar sua conta</span>}

          {step === 'email' && <span>Digite seu email abaixo para criar sua conta</span>}

          {step === 'password' && <span>Digite sua senha abaixo para criar sua conta</span>}
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
                            placeholder="Nome"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" className="w-full" onClick={nextStep}>
                    Próximo
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
                            placeholder="E-mail"
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
                      Voltar
                    </Button>
                    <Button type="button" className="w-full" onClick={nextStep}>
                      Próximo
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
                            Senha
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
                            Confirmar Senha
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
                        Voltar
                      </Button>
                      <Button type="submit" className="w-full">
                        <span>Cadastrar</span>
                        {/* {!isLoading ? (
                          <span>Cadastrar</span>
                        ) : (
                          <SymbolIcon className="animate-spin" />
                        )} */}
                      </Button>
                    </div>
                  </>
                </>
              )}
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Ao clicar em continuar, você concorda com nossos{' '}
              <Link to="#" className="underline">
                Termos de Serviço
              </Link>{' '}
              e{' '}
              <Link to="#" className="underline">
                Política de Privacidade
              </Link>
              .
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}