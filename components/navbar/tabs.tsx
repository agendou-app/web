'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const TABS = [
  { label: 'Geral', href: '' },
  { label: 'Configurações', href: 'settings' },
]

const regex = /^\/schedules\/[^/]+(\/[^/]+)?$/

export function AnimatedTabs() {
  const pathname = usePathname()
  let slug = ''

  const [activeTab, setActiveTab] = useState(TABS[0].label)
  const containerRef = useRef<HTMLDivElement>(null)
  const activeTabRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const container = containerRef.current

    if (container && activeTab) {
      const activeTabElement = activeTabRef.current

      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement

        const clipLeft = offsetLeft
        const clipRight = offsetLeft + offsetWidth

        container.style.opacity = '100'
        container.style.clipPath = `inset(0 ${Number(100 - (clipRight / container.offsetWidth) * 100).toFixed()}% 0 ${Number((clipLeft / container.offsetWidth) * 100).toFixed()}% round 17px)`
      }
    }
  }, [activeTab, activeTabRef, containerRef, pathname])

  if (!regex.test(pathname)) {
    return <div className="border-b pt-4" />
  }

  const slugMatch = pathname.match(/^\/schedules\/([^/]+)/)

  if (slugMatch) {
    slug = slugMatch[1]
  }

  return (
    <div className="sticky top-0 border-b bg-background/85 py-4 backdrop-blur-sm">
      <div className="overflow-x-auto overflow-y-hidden px-2">
        <div className="relative mx-auto flex w-fit flex-col items-center rounded-full">
          <div
            ref={containerRef}
            className="absolute z-10 w-full overflow-hidden opacity-0 [clip-path:inset(0px_75%_0px_0%_round_17px)] [transition:clip-path_0.25s_ease]"
          >
            <div className="relative flex w-full justify-center bg-primary">
              {TABS.map((tab, index) => (
                <Link
                  href={`/schedules/${slug}/${tab.href}`}
                  key={index}
                  onClick={() => setActiveTab(tab.label)}
                  className="flex h-8 items-center whitespace-nowrap rounded-full p-3 text-sm font-medium text-primary-foreground"
                  tabIndex={-1}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative flex w-full justify-center">
            {TABS.map((tab, index) => {
              const isActive =
                pathname === `/schedules/${slug}/${tab.href}` ||
                (tab.href === '' && pathname === `/schedules/${slug}`)

              return (
                <Link
                  href={`/schedules/${slug}/${tab.href}`}
                  key={index}
                  ref={isActive ? activeTabRef : null}
                  onClick={() => setActiveTab(tab.label)}
                  className="flex h-8 items-center whitespace-nowrap rounded-full p-3 text-sm font-medium text-muted-foreground"
                >
                  {tab.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
