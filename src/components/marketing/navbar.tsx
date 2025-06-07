'use client'

import Link from 'next/link'
import { useEffect,/`useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'auto' : 'auto'
  }, [isOpen])

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[rgba(10,10,10,0.6)]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-white font-semibold text-lg">
            Bisnovo
          </div>

          {/* Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-white hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/product"
              className="text-sm font-medium text-white hover:text-primary transition-colors"
            >
              Product
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden w-full z-40 px-4 pb-6 pt-4 backdrop-blur-md bg-[rgba(10,10,10,0.6)]">
          <ul className="space-y-4 text-white">
            <li>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/product"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium hover:text-primary transition-colors"
              >
                Product
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
