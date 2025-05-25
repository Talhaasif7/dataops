"use client"

import { SignUpForm } from "@/components/signup-form"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SignUpPage() {
  const { user, isLoading, isInitialized } = useAuth()

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
      <SignUpForm />
    </div>
  )
}
