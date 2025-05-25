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

    const { data: dataSources, error } = await supabase
      .from("data_sources")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching data sources:", error)
      return NextResponse.json({ error: "Failed to fetch data sources" }, { status: 500 })
    }

    return NextResponse.json(dataSources)
  } catch (error) {
    console.error("Error in data sources API:", error)
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

    const { data: dataSource, error } = await supabase
      .from("data_sources")
      .insert({
        ...body,
        user_id: session.user.id,
      })
      .select()
      .single()

    if (error) {
      console.error("Error adding data source:", error)
      return NextResponse.json({ error: "Failed to add data source" }, { status: 500 })
    }

    return NextResponse.json(dataSource, { status: 201 })
  } catch (error) {
    console.error("Error in data sources API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
