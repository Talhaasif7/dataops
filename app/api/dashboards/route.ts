import { createServerClient } from "@/lib/supabase"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient()

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: dashboards, error } = await supabase
      .from("dashboards")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching dashboards:", error)
      return NextResponse.json({ error: "Failed to fetch dashboards" }, { status: 500 })
    }

    return NextResponse.json(dashboards)
  } catch (error) {
    console.error("Error in dashboards API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient()

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const { data: dashboard, error } = await supabase
      .from("dashboards")
      .insert({
        ...body,
        user_id: session.user.id,
        charts: body.charts || [],
      })
      .select()
      .single()

    if (error) {
      console.error("Error adding dashboard:", error)
      return NextResponse.json({ error: "Failed to add dashboard" }, { status: 500 })
    }

    return NextResponse.json(dashboard, { status: 201 })
  } catch (error) {
    console.error("Error in dashboards API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
