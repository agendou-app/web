import { NameForm } from './forms/name'
import { AboutForm } from './forms/about'
import { SlugForm } from './forms/slug'
import { LogoForm } from './forms/logo'

export function ScheduleSettingsPage() {
  return (
    <div className="h-[200vh]">
      <div className="border-b">
        <div className="container mx-auto flex px-4 py-12">
          <h2 className="text-3xl font-medium">Configurações</h2>
        </div>
      </div>

      <div className="container mx-auto flex px-4">
        <div className="hidden w-full max-w-[260px] pt-4 sm:block">Sidebar</div>
        <div className="flex-1 pt-2">
          <NameForm />
          <AboutForm />
          <SlugForm />
          <LogoForm />
        </div>
      </div>
    </div>
  )
}