import type React from "react"
import type { Metadata } from "next"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { AuthGuard } from "@/components/auth-guard"

export const metadata: Metadata = {
  title: "Dashboard - DataOps",
  description: "DataOps AI-powered platform dashboard",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
        <Sidebar className="hidden lg:flex w-64 flex-col flex-shrink-0" />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
