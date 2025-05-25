"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Database, GitBranch, BarChart3, Settings, Users, HelpCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { signOut } = useAuth()

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Data Sources",
      href: "/dashboard/data-sources",
      icon: Database,
    },
    {
      name: "Pipelines",
      href: "/dashboard/pipelines",
      icon: GitBranch,
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      name: "Team",
      href: "/dashboard/team",
      icon: Users,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const handleSignOut = async () => {
    await signOut()
    window.location.href = "/"
  }

  return (
    <div className={cn("flex flex-col h-full bg-gray-900 border-r border-gray-800", className)}>
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="text-2xl font-bold">
            <span className="text-white">Data</span>
            <span className="text-teal-400">Ops</span>
          </div>
        </Link>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
              pathname === item.href ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800",
            )}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="space-y-3">
          <Link
            href="/dashboard/help"
            className="flex items-center px-4 py-3 text-sm text-gray-400 rounded-md hover:text-white hover:bg-gray-800 transition-colors"
          >
            <HelpCircle className="h-5 w-5 mr-3" />
            Help & Support
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
