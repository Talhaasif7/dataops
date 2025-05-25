import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Create a single supabase client for interacting with your database
export const createBrowserClient = () => {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
      flowType: "pkce", // Use PKCE flow for better security
    },
    global: {
      headers: {
        "x-client-info": "dataops-dashboard",
      },
    },
    // Add performance optimizations
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  })
}

// Client-side Supabase client (singleton to prevent multiple instances)
let clientInstance: ReturnType<typeof createBrowserClient> | null = null

export const getClientInstance = () => {
  if (typeof window === "undefined") {
    // Server-side: always create a new instance
    return createBrowserClient()
  }

  if (!clientInstance) {
    try {
      clientInstance = createBrowserClient()
    } catch (error) {
      console.error("Failed to create Supabase client:", error)
      throw error
    }
  }
  return clientInstance
}

// Server-side Supabase client
export const createServerClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!supabaseServiceKey) {
    throw new Error("Missing Supabase service role key")
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Simplified connection test
export const testConnection = async () => {
  try {
    const client = getClientInstance()
    const { error } = await client.from("users").select("id").limit(1).single()
    return !error
  } catch (error) {
    console.error("Connection test failed:", error)
    return false
  }
}
