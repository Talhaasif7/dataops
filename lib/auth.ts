import { createServerClient } from "@/lib/supabase"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getSession() {
  const cookieStore = cookies()
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return session
}

export async function getUserProfile(userId: string) {
  const supabase = createServerClient()

  const { data: user, error } = await supabase.from("users").select("*").eq("id", userId).single()

  if (error || !user) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return user
}
