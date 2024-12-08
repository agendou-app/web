import { Navigation } from './navigation'
import { Menu } from './menu'

import { AnimatedTabs } from '@/components/navbar/tabs'

export function Navbar() {
  return (
    <>
      <div>
        <div className="flex justify-between px-4 pt-4">
          <Navigation />

          <Menu />
        </div>
      </div>
      <AnimatedTabs />
    </>
  )
}
