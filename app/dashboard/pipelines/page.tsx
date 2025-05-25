"use client"

import { useState, useEffect } from "react"
import { PipelineCard } from "@/components/dashboard/pipeline-card"
import { CreatePipelineDialog } from "@/components/dashboard/create-pipeline-dialog"
import { getClientInstance } from "@/lib/supabase"
import { useAuth } from "@/components/auth-provider"
import { GitBranch } from "lucide-react"
import type { Tables } from "@/types/supabase"

export default function PipelinesPage() {
  const { user } = useAuth()
  const [pipelines, setPipelines] = useState<Tables<"pipelines">[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPipelines() {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const supabase = getClientInstance()
        const { data, error } = await supabase
          .from("pipelines")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) {
          throw new Error(error.message)
        }

        setPipelines(data || [])
      } catch (error) {
        console.error("Error fetching pipelines:", error)
        setError(error instanceof Error ? error.message : "Failed to load pipelines")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPipelines()
  }, [user])

  const handleAddPipeline = async (newPipeline: Partial<Tables<"pipelines">>) => {
    if (!user) return

    try {
      const supabase = getClientInstance()
      const { data, error } = await supabase
        .from("pipelines")
        .insert({
          ...newPipeline,
          user_id: user.id,
          steps: newPipeline.steps || [],
        })
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      setPipelines((prev) => [data, ...prev])
    } catch (error) {
      console.error("Error adding pipeline:", error)
      setError(error instanceof Error ? error.message : "Failed to add pipeline")
    }
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-2xl font-bold">Pipelines</h1>
        </div>
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Pipelines</h3>
          <p className="text-gray-400 mb-6">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-2xl font-bold">Pipelines</h1>
        <CreatePipelineDialog onAddPipeline={handleAddPipeline} />
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : pipelines.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pipelines.map((pipeline) => (
            <PipelineCard key={pipeline.id} pipeline={pipeline} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <GitBranch className="h-16 w-16 text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No pipelines found</h3>
          <p className="text-gray-400 mb-6">Create your first pipeline to start processing data.</p>
          <CreatePipelineDialog onAddPipeline={handleAddPipeline} />
        </div>
      )}
    </div>
  )
}
