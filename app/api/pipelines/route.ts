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

    const { data: pipelines, error } = await supabase
      .from("pipelines")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching pipelines:", error)
      return NextResponse.json({ error: "Failed to fetch pipelines" }, { status: 500 })
    }

    return NextResponse.json(pipelines)
  } catch (error) {
    console.error("Error in pipelines API:", error)
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

    // Start a transaction to insert pipeline and its data sources
    const { data: pipeline, error } = await supabase
      .from("pipelines")
      .insert({
        ...body,
        user_id: session.user.id,
        steps: body.steps || [],
      })
      .select()
      .single()

    if (error) {
      console.error("Error adding pipeline:", error)
      return NextResponse.json({ error: "Failed to add pipeline" }, { status: 500 })
    }

    // If data sources are provided, create the relationships
    if (body.dataSources && body.dataSources.length > 0) {
      const pipelineDataSources = body.dataSources.map((dataSourceId: string) => ({
        pipeline_id: pipeline.id,
        data_source_id: dataSourceId,
      }))

      const { error: relationError } = await supabase.from("pipeline_data_sources").insert(pipelineDataSources)

      if (relationError) {
        console.error("Error adding pipeline data sources:", relationError)
        // We don't fail the request if this fails, just log it
      }
    }

    return NextResponse.json(pipeline, { status: 201 })
  } catch (error) {
    console.error("Error in pipelines API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
