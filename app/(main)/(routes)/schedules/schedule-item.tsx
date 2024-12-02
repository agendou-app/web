import Link from 'next/link'
import {
  CalendarIcon,
  CopyIcon,
  DotsHorizontalIcon,
  GearIcon,
  Link1Icon,
  PersonIcon,
  RulerHorizontalIcon,
} from '@radix-ui/react-icons'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { AvatarFallback } from '@/components/ui/avatar'

export function ScheduleItem() {
  return (
    <div className="rounded-md border p-4 shadow-md">
      <header className="flex items-start">
        <Avatar className="mr-2 h-10 w-10 self-center">
          <AvatarImage src="https://github.com/kaikySantos.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Link href="" className="text-base font-medium hover:underline">
            Barbearia Du Zé
          </Link>
          <Link
            href=""
            className="flex max-w-min items-center gap-2 whitespace-nowrap text-muted-foreground hover:underline"
          >
            <Link1Icon />
            <p>/barbeariaduze</p>
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline">
              <DotsHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              <CalendarIcon />
              Agendamentos
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <RulerHorizontalIcon />
              Métricas
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Link1Icon />
              Copiar link
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <GearIcon />
              Configurações
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <footer className="mt-4 space-x-2">
        <Badge variant="outline">Ativo</Badge>
        <Badge variant="secondary">Nenhum novo agendamentos</Badge>
      </footer>
    </div>
  )
}

export function ScheduleItemSkeleton() {
  return (
    <div className="rounded-md border p-4 shadow-md">
      <div className="flex space-x-4">
        <Skeleton className="h-10 w-10" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="mt-8 flex space-x-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  )
}
