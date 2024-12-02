import { Navigation } from './navigation'
import { Menu } from './menu'

export function Navbar() {
  return (
    <div className="border-b p-4">
      <div className="flex justify-between">
        <Navigation />

        <Menu />
      </div>
    </div>
  )
}
