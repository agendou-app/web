'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  slug: z
    .string()
    .min(2, 'Deve conter pelo menos 3 caracteres')
    .max(50, 'Deve conter no máximo 50 caracteres')
    .regex(
      /^[a-z0-9-]+$/,
      'O slug só pode conter letras minúsculas, números e hífens',
    )
    .regex(
      /^(?!-).*?(?<!-)$/,
      'O slug não pode começar ou terminar com um hífen',
    )
    .regex(/^(?!.*--).*$/, 'O slug não pode conter hífens consecutivos'),
})

export function SlugForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div id="name-form-container" className="py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-md border"
        >
          <div className="p-6">
            <h3 className="text-base">Slug (Endereço)</h3>
            <p className="pb-3 pt-1 text-sm text-muted-foreground">
              Usado para definir o endereço na URL da sua agenda no nosso
              sistema
            </p>

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input leftContent="http://localhost:3333/" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <footer className="flex justify-end border-t bg-accent/50 px-6 py-3">
            <Button disabled={!form.formState.isDirty} type="submit" size="sm">
              Salvar
            </Button>
          </footer>
        </form>
      </Form>
    </div>
  )
}
