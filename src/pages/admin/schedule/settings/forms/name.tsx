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
  name: z
    .string()
    .min(2, 'Deve conter pelo menos 2 caracteres')
    .max(50, 'Deve conter no máximo 50 caracteres'),
})

export function NameForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
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
            <h3 className="text-base">Nome da Agenda</h3>
            <p className="pb-3 pt-1 text-sm text-muted-foreground">
              Usado para exibir o nome e identificar sua agenda no sistema
            </p>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
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