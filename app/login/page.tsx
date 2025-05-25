"use client"

import { LoginForm } from "@/components/login-form"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"

export default function LoginPage() {
  const { user, isLoading, isInitialized } = useAuth()
  const router = useRouter()
  const [hasRedirected, setHasRedirected] = useState(false)
  const redirectAttempted = useRef(false)

  useEffect(() => {
    // Only redirect once when we have a user and haven't redirected yet
    if (isInitialized && user && !hasRedirected && !redirectAttempted.current) {
      console.log("Attempting redirect to dashboard for:", user.email)
      redirectAttempted.current = true
      setHasRedirected(true)

      // Try window.location as a fallback if router.replace doesn't work
      try {
        router.replace("/dashboard")

        // Fallback after 1 second if router.replace doesn't work
        setTimeout(() => {
          if (window.location.pathname === "/login") {
            console.log("Router redirect failed, using window.location")
            window.location.href = "/dashboard"
          }
        }, 1000)
      } catch (error) {
        console.error("Router redirect failed:", error)
        window.location.href = "/dashboard"
      }
    }
  }, [user, isInitialized, router, hasRedirected])

  // Show loading state while auth is initializing
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
          <div className="text-white">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="text-2xl font-bold mb-8">
        <span className="text-white">Data</span>
        <span className="text-teal-400">Ops</span>
      </div>
      <LoginForm />
    </div>
  )
}
