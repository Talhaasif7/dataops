"use client"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import type React from "react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading, isInitialized } = useAuth()
  const router = useRouter()
  const [hasRedirected, setHasRedirected] = useState(false)
  const redirectAttempted = useRef(false)

  useEffect(() => {
    // Only check auth once initialization is complete
    if (isInitialized && !user && !hasRedirected && !redirectAttempted.current) {
      console.log("AuthGuard: No user found, redirecting to login...")
      redirectAttempted.current = true
      setHasRedirected(true)

      try {
        router.replace("/login")

        // Fallback after 1 second
        setTimeout(() => {
          if (window.location.pathname.startsWith("/dashboard")) {
            console.log("AuthGuard: Router redirect failed, using window.location")
            window.location.href = "/login"
          }
        }, 1000)
      } catch (error) {
        console.error("AuthGuard: Router redirect failed:", error)
        window.location.href = "/login"
      }
    }
  }, [user, isInitialized, router, hasRedirected])

  // Show loading while auth is initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
          <div className="text-white">Loading...</div>
        </div>
      </div>
    )
  }

  // Show redirecting state if no user
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
          <div className="text-white">Redirecting to login...</div>
          {hasRedirected && (
            <div className="text-xs text-gray-500 mt-4">
              If you're not redirected automatically,{" "}
              <a href="/login" className="text-teal-400 underline">
                click here
              </a>
            </div>
          )}
        </div>
      </div>
    )
  }

  return <>{children}</>
}
