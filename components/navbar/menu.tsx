'use client'

import { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import {
  DesktopIcon,
  ExitIcon,
  HamburgerMenuIcon,
  MoonIcon,
  SunIcon,
} from '@radix-ui/react-icons'

export function Menu() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <HamburgerMenuIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="end">
          <MenuContenct />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <HamburgerMenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <MenuContenct />
      </DrawerContent>
    </Drawer>
  )
}

function MenuContenct() {
  const { setTheme, theme } = useTheme()
  const router = useRouter()

  function logout() {
    signOut({
      redirect: false,
    })

    router.replace('/auth/sign-in')
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center px-4 pt-4">
        <div className="flex-1">
          <p className="text-sm font-medium">Kaiky Santos</p>
          <p className="text-xs text-muted-foreground">kaiky@email.com</p>
        </div>
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/kaikySantos.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex items-center px-4">
        <p className="flex-1 text-sm">Theme</p>

        <ToggleGroup
          value={theme}
          onValueChange={(newTheme) => setTheme(newTheme)}
          variant="outline"
          size="sm"
          type="single"
        >
          <ToggleGroupItem value="system">
            <DesktopIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="light">
            <SunIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="dark">
            <MoonIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Separator />

      <div className="px-4 pb-3">
        <Button onClick={logout} variant="ghost" className="w-full">
          Log Out <ExitIcon />
        </Button>
      </div>
    </div>
  )
}
