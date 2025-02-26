'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { IconLogo } from '@/components/ui/icons'

export const Header: React.FC = () => {
  return (
    <header className="fixed w-full p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div>
        <a href="/">
          <IconLogo className={cn('w-5 h-5')} />
          <span className="sr-only">Mehedi</span>
        </a>
      </div>
    </header>
  )
}

export default Header