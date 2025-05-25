"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs"
import type { Session, User } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"
import type React from "react"

type AuthContextType = {
  session: Session | null
  user: User | null
  isLoading: boolean
  isInitialized: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  // Use the official Supabase Auth Helpers client for Next.js
  const supabase = createPagesBrowserClient<Database>()

  const updateAuthState = useCallback((session: Session | null) => {
    console.log("Updating auth state:", !!session, session?.user?.email)
    setSession(session)
    setUser(session?.user ?? null)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    let mounted = true

    const getInitialSession = async () => {
      try {
        console.log("Getting initial session...")
        const {
          data: { session },
        } = await supabase.auth.getSession()

        console.log("Initial session:", !!session, session?.user?.email)

        if (mounted) {
          updateAuthState(session)
          setIsInitialized(true)
        }
      } catch (error) {
        console.error("Error in getInitialSession:", error)
        if (mounted) {
          setIsLoading(false)
          setIsInitialized(true)
        }
      }
    }

    getInitialSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event, !!session, session?.user?.email)

      if (mounted) {
        updateAuthState(session)

        if (!isInitialized) {
          setIsInitialized(true)
        }
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase, updateAuthState, isInitialized])

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        console.log("Attempting sign in for:", email)
        setIsLoading(true)

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        console.log("Sign in result:", !!data.session, error?.message, data.user?.email)

        if (error) {
          setIsLoading(false)
          return { error }
        }

        // Don't set loading to false here - let the auth state change handle it
        return { error: null }
      } catch (error) {
        console.error("Sign in error:", error)
        setIsLoading(false)
        return { error: error as Error }
      }
    },
    [supabase],
  )

  const signOut = useCallback(async () => {
    try {
      console.log("Signing out...")
      setIsLoading(true)
      await supabase.auth.signOut()
      setSession(null)
      setUser(null)
      setIsLoading(false)
    } catch (error) {
      console.error("Error signing out:", error)
      setIsLoading(false)
    }
  }, [supabase])

  const value = {
    session,
    user,
    isLoading,
    isInitialized,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
