"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"

export function LoginForm() {
  const { signIn, user, isLoading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      console.log("Submitting login form...")
      const { error } = await signIn(email, password)

      if (error) {
        console.error("Login error:", error)
        setError("Invalid email or password")
        setIsSubmitting(false)
      } else {
        console.log("Login successful, auth state should update...")
        // Don't set isSubmitting to false - let the parent component handle redirect
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An unexpected error occurred. Please try again.")
      setIsSubmitting(false)
    }
  }

  // Show success state if user is authenticated
  if (user) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400 mx-auto mb-4"></div>
            <p className="text-green-600 font-medium">Login successful!</p>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Login to DataOps</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting || isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting || isLoading}
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-gray-500 text-center">
          <p>Don't have an account?</p>
          <Link href="/signup">
            <Button variant="link">Sign up here</Button>
          </Link>
        </div>
        <div className="text-sm text-gray-500 text-center">
          <p>Or use these demo accounts:</p>
          <p>admin@example.com / password123</p>
          <p>user@example.com / password123</p>
          <p>engineer@example.com / password123</p>
          <p className="text-xs text-gray-400 mt-2">(Create these manually in Supabase Dashboard)</p>
        </div>
      </CardFooter>
    </Card>
  )
}
