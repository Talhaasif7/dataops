"use client"

import { useState } from "react"
import { Bell, Search, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sidebar } from "@/components/dashboard/sidebar"
import { useAuth } from "@/components/auth-provider"

export function Header() {
  const { user, signOut } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-gray-900 border-b border-gray-800 px-4 sm:px-6">
      {/* Mobile sidebar trigger */}
      <div className="flex items-center lg:hidden mr-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Search - Desktop */}
      <div className="flex-1 flex items-center max-w-md hidden sm:block">
        <form className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search pipelines, data sources..."
            className="w-full bg-gray-800 border-gray-700 pl-8 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Mobile search toggle */}
      <div className="flex-1 flex items-center sm:hidden">
        {mobileSearchOpen ? (
          <form className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-gray-800 border-gray-700 pl-8 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => setMobileSearchOpen(false)}
              autoFocus
            />
          </form>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => setMobileSearchOpen(true)} className="ml-auto mr-2">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        )}
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Desktop search spacer */}
        <div className="hidden sm:block flex-1" />

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-teal-500" />
          <span className="sr-only">Notifications</span>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://avatar.vercel.sh/${user?.email}`} alt={user?.email || ""} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-white">{user?.email?.split("@")[0] || "User"}</p>
                <p className="text-xs leading-none text-gray-400">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">Support</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700" onClick={handleSignOut}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
