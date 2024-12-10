import { Link } from 'react-router'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ImageIcon, Link1Icon } from '@radix-ui/react-icons'

export function SchedulePage() {
  return (
    <div>
      <div className="container mx-auto flex px-4 py-12">
        <div className="flex flex-1 flex-col items-start space-y-6">
          <h2 className="text-3xl font-medium">Barbearia Du Zé</h2>
          <div className="flex flex-wrap gap-3">
            <Button>Visitar</Button>
            <Button variant="outline">Configurações</Button>
          </div>
        </div>
        <div className="hidden aspect-video h-[96px] items-center justify-center gap-2 rounded-md border text-2xl text-muted-foreground sm:flex">
          <ImageIcon width={32} height={32} />
          <p>Logo</p>
        </div>
      </div>

      <div className="mx-auto border-t py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-base">Sistema Online</h2>
          <p className="text-sm text-muted-foreground">
            A versão publicada que está disponível para os seus usuários.
          </p>

          <div className="mt-4 flex flex-col gap-4 rounded-md border p-6 sm:flex-row">
            <div className="flex aspect-video items-center justify-center rounded-md border text-muted-foreground sm:min-h-56">
              <ImageIcon width={30} height={30} />
              <p>Preview</p>
            </div>

            <div className="flex flex-col gap-6 py-2">
              <div>
                <p className="text-sm">Endereço</p>
                <Link
                  to=""
                  className="flex items-center gap-1 truncate text-sm text-muted-foreground hover:underline"
                >
                  <Link1Icon />
                  https://localhost:3333/barbeariaduze
                </Link>
              </div>

              <div>
                <p className="text-sm">Status</p>
                <div className="space-x-2">
                  <Badge variant="outline">Ativo</Badge>
                  <Badge variant="secondary">Nenhum novo agendamento</Badge>
                </div>
              </div>

              <div className="flex flex-1 items-end">
                <Button size="sm" variant="outline">
                  Visualizar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}