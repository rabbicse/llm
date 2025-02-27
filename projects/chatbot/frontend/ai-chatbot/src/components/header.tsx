'use client'

import React from 'react'
import { HomeIcon } from 'lucide-react'

export const Header: React.FC = () => {
  return (
    <header className="fixed w-full p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div>
        <a href="/">
          <HomeIcon size={16} />
          <span className="sr-only">Mehedi</span>
        </a>
      </div>
    </header>
  )
}

export default Header