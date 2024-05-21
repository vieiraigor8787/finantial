'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useMedia } from 'react-use'
import { Menu } from 'lucide-react'

import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { NavButton } from '@/components/nav-button'

const routes = [
  { href: '/', label: 'Painel' },
  { href: '/transacoes', label: 'Transações' },
  { href: '/contas', label: 'Contas' },
  { href: '/categorias', label: 'Categorias' },
  { href: '/configuracoes', label: 'Configurações' },
]

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useMedia('(max-width: 1024px', false)

  const onClick = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            variant="outline"
            size="sm"
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <div className="flex absolute top-1.5">
            <Image
              src="/logo-menu-mobile.svg"
              alt="logo"
              width={28}
              height={28}
              className=""
            />
            <p className="font-semibold text-[#3b82f6] text-xl ml-2.5">
              Finantial
            </p>
          </div>
          <nav className="flex flex-col gap-2 pt-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.href === pathname ? 'secondary' : 'ghost'}
                onClick={() => onClick(route.href)}
                className="w-full justify-start"
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          label={route.label}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  )
}
