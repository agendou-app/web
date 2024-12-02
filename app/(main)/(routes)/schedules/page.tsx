import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusIcon } from '@radix-ui/react-icons'

import { ScheduleItem } from './schedule-item'

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-3">
      <div className="flex gap-3">
        <Input className="flex-1" placeholder="Pesquisar por agendas" />
        <Button>
          <PlusIcon />
          <span className="hidden sm:block">Nova Agenda</span>
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ScheduleItem />
      </div>
    </div>
  )
}
