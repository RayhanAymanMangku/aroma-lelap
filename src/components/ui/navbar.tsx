"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { navList } from "../featured/lib/constants"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }



  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-t from-black to-gray-900 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-semibold text-amber-500">
              Aroma Lelap<span className="text-white">.</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
                {navList.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-amber-500 hover:text-amber-700 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2"
            >
              {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
                {navList.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-amber-500 hover:text-amber-700 block px-3 py-2 text-base font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
