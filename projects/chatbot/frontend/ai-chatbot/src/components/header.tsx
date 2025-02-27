'use client'

import React from 'react'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'

export const Header: React.FC = () => {
  return (
    <header className="fixed w-full p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div>
        <Link href="/">
          <HomeIcon size={24} />
          <span className="sr-only">Mehedi</span>
        </Link>
      </div>
    </header>
  )
}

export default Header