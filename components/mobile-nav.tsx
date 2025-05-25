"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: "/platform", label: "Platform" },
    { label: "Solutions", disabled: true },
    { label: "Developers", disabled: true },
    { label: "Resources", disabled: true },
    { href: "/pricing", label: "Pricing" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gray-950 border-gray-800">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <div className="text-xl font-bold">
              <span className="text-white">Data</span>
              <span className="text-teal-400">Ops</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="flex flex-col space-y-4">
            {navItems.map((item, index) =>
              item.href ? (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors py-2 text-lg"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <span key={index} className="text-gray-500 py-2 text-lg cursor-not-allowed">
                  {item.label} (Coming Soon)
                </span>
              ),
            )}
          </nav>

          <div className="mt-auto space-y-4">
            <Link href="/login" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
                Login
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setOpen(false)}>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
