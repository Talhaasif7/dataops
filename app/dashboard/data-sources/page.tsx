"use client"

import { useState, useEffect } from "react"
import { DataSourceCard } from "@/components/dashboard/data-source-card"
import { AddDataSourceDialog } from "@/components/dashboard/add-data-source-dialog"
import { getClientInstance } from "@/lib/supabase"
import { useAuth } from "@/components/auth-provider"
import { Database } from "lucide-react"
import type { Tables } from "@/types/supabase"

export default function DataSourcesPage() {
  const { user } = useAuth()
  const [dataSources, setDataSources] = useState<Tables<"data_sources">[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDataSources() {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const supabase = getClientInstance()
        const { data, error } = await supabase
          .from("data_sources")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) {
          throw new Error(error.message)
        }

        setDataSources(data || [])
      } catch (error) {
        console.error("Error fetching data sources:", error)
        setError(error instanceof Error ? error.message : "Failed to load data sources")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDataSources()
  }, [user])

  const handleAddDataSource = async (newDataSource: Partial<Tables<"data_sources">>) => {
    if (!user) return

    try {
      const supabase = getClientInstance()
      const { data, error } = await supabase
        .from("data_sources")
        .insert({
          ...newDataSource,
          user_id: user.id,
        })
        .select()
        .single()

      if (error) {
        throw new Error(error.message)
      }

      setDataSources((prev) => [data, ...prev])
    } catch (error) {
      console.error("Error adding data source:", error)
      setError(error instanceof Error ? error.message : "Failed to add data source")
    }
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-2xl font-bold">Data Sources</h1>
        </div>
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Data Sources</h3>
          <p className="text-gray-400 mb-6">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-2xl font-bold">Data Sources</h1>
        <AddDataSourceDialog onAddDataSource={handleAddDataSource} />
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : dataSources.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dataSources.map((dataSource) => (
            <DataSourceCard key={dataSource.id} dataSource={dataSource} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Database className="h-16 w-16 text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No data sources found</h3>
          <p className="text-gray-400 mb-6">Connect to your first data source to start building pipelines.</p>
          <AddDataSourceDialog onAddDataSource={handleAddDataSource} />
        </div>
      )}
    </div>
  )
}
