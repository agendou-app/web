import Image from 'next/image'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CaretSortIcon, SlashIcon } from '@radix-ui/react-icons'

export function Navigation() {
  return (
    <div className="flex items-center">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden sm:block">
            <Image
              src="/agendou-logo-black.png"
              alt="Illustration"
              width={800}
              height={800}
              quality={1}
              priority={true}
              className="w-24 dark:invert"
            />
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden sm:block">
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center">
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarImage src="https://github.com/kaikySantos.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                Agendas
                <CaretSortIcon width={30} />
              </DropdownMenuTrigger>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden sm:block">
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <p>Test</p>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
