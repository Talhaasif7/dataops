"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatsCard } from "@/components/dashboard/stats-card"
import { DataSourceCard } from "@/components/dashboard/data-source-card"
import { PipelineCard } from "@/components/dashboard/pipeline-card"
import { AddDataSourceDialog } from "@/components/dashboard/add-data-source-dialog"
import { Database, GitBranch, Zap, Brain, AlertCircle } from "lucide-react"
import { getClientInstance } from "@/lib/supabase"
import { useAuth } from "@/components/auth-provider"
import type { Tables } from "@/types/supabase"

export default function DashboardPage() {
  const { user, isInitialized } = useAuth()
  const [dataSources, setDataSources] = useState<Tables<"data_sources">[]>([])
  const [pipelines, setPipelines] = useState<Tables<"pipelines">[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    if (!user || !isInitialized) {
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const supabase = getClientInstance()

      // Fetch both data sources and pipelines in parallel
      const [dataSourcesResult, pipelinesResult] = await Promise.all([
        supabase
          .from("data_sources")
          .select("id, name, type, status, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("pipelines")
          .select("id, name, description, status, steps, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10),
      ])

      if (dataSourcesResult.error) {
        throw new Error(`Failed to load data sources: ${dataSourcesResult.error.message}`)
      }

      if (pipelinesResult.error) {
        throw new Error(`Failed to load pipelines: ${pipelinesResult.error.message}`)
      }

      setDataSources(dataSourcesResult.data || [])
      setPipelines(pipelinesResult.data || [])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setError(error instanceof Error ? error.message : "Failed to load dashboard data")
    } finally {
      setIsLoading(false)
    }
  }, [user, isInitialized])

  useEffect(() => {
    if (isInitialized && user) {
      fetchData()
    } else if (isInitialized && !user) {
      setIsLoading(false)
    }
  }, [fetchData, isInitialized, user])

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
        console.error("Error adding data source:", error)
        setError(`Failed to add data source: ${error.message}`)
        return
      }

      setDataSources((prev) => [data, ...prev])
    } catch (error) {
      console.error("Error adding data source:", error)
      setError("Failed to add data source")
    }
  }

  // Show loading state while auth is initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400"></div>
          <div className="text-white">Initializing...</div>
        </div>
      </div>
    )
  }

  const connectedDataSources = dataSources.filter((ds) => ds.status === "connected").length
  const activePipelines = pipelines.filter((p) => p.status === "active").length

  if (error) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold">AI-Powered Dashboard</h1>
        <Card className="bg-red-900/20 border-red-500/50">
          <CardContent className="p-6">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-400 mb-2">Error Loading Dashboard</h3>
              <p className="text-gray-300 mb-4">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">AI-Powered Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-400">Monitor your data pipelines and AI insights</p>
        </div>
        <AddDataSourceDialog onAddDataSource={handleAddDataSource} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Connected Sources"
          value={connectedDataSources.toString()}
          icon={Database}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Pipelines"
          value={activePipelines.toString()}
          icon={GitBranch}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="AI Optimizations"
          value="47"
          description="This month"
          icon={Brain}
          trend={{ value: 23, isPositive: true }}
        />
        <StatsCard
          title="Avg Processing Time"
          value="2.1m"
          description="AI-optimized"
          icon={Zap}
          trend={{ value: 15, isPositive: false }}
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-gray-800 w-full sm:w-auto">
          <TabsTrigger value="overview" className="flex-1 sm:flex-none">
            Overview
          </TabsTrigger>
          <TabsTrigger value="data-sources" className="flex-1 sm:flex-none">
            Data Sources
          </TabsTrigger>
          <TabsTrigger value="pipelines" className="flex-1 sm:flex-none">
            Pipelines
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Recent Data Sources */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Recent Data Sources</CardTitle>
                <CardDescription className="text-gray-400">Your recently connected sources</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded bg-gray-700 animate-pulse" />
                        <div className="space-y-1 flex-1">
                          <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
                          <div className="h-3 bg-gray-700 rounded animate-pulse w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : dataSources.length > 0 ? (
                  <div className="space-y-3">
                    {dataSources.slice(0, 3).map((dataSource) => (
                      <div
                        key={dataSource.id}
                        className="flex items-center justify-between p-2 rounded hover:bg-gray-750 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Database className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <span className="text-sm font-medium text-white truncate block">{dataSource.name}</span>
                            <span className="text-xs text-gray-400">{dataSource.type}</span>
                          </div>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                            dataSource.status === "connected"
                              ? "bg-green-900/30 text-green-400"
                              : dataSource.status === "disconnected"
                                ? "bg-gray-800 text-gray-400"
                                : "bg-red-900/30 text-red-400"
                          }`}
                        >
                          {dataSource.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Database className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">No data sources found</p>
                    <p className="text-sm text-gray-500">Connect your first data source to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Pipelines */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">AI-Generated Pipelines</CardTitle>
                <CardDescription className="text-gray-400">Your recently created pipelines</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded bg-gray-700 animate-pulse" />
                        <div className="space-y-1 flex-1">
                          <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4" />
                          <div className="h-3 bg-gray-700 rounded animate-pulse w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : pipelines.length > 0 ? (
                  <div className="space-y-3">
                    {pipelines.slice(0, 3).map((pipeline) => (
                      <div
                        key={pipeline.id}
                        className="flex items-center justify-between p-2 rounded hover:bg-gray-750 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <GitBranch className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <span className="text-sm font-medium text-white truncate block">{pipeline.name}</span>
                            <span className="text-xs text-gray-400">
                              {Array.isArray(pipeline.steps) ? pipeline.steps.length : 0} steps
                            </span>
                          </div>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                            pipeline.status === "active"
                              ? "bg-green-900/30 text-green-400"
                              : pipeline.status === "inactive"
                                ? "bg-gray-800 text-gray-400"
                                : "bg-red-900/30 text-red-400"
                          }`}
                        >
                          {pipeline.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <GitBranch className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">No pipelines found</p>
                    <p className="text-sm text-gray-500">Create your first AI-powered pipeline</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data-sources" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {isLoading ? (
              [...Array(6)].map((_, i) => <div key={i} className="h-48 bg-gray-800 rounded-lg animate-pulse" />)
            ) : dataSources.length > 0 ? (
              dataSources.map((dataSource) => <DataSourceCard key={dataSource.id} dataSource={dataSource} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <Database className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No data sources found</h3>
                <p className="text-gray-400 mb-6">Connect to your first data source to start building pipelines.</p>
                <AddDataSourceDialog onAddDataSource={handleAddDataSource} />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pipelines" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {isLoading ? (
              [...Array(6)].map((_, i) => <div key={i} className="h-48 bg-gray-800 rounded-lg animate-pulse" />)
            ) : pipelines.length > 0 ? (
              pipelines.map((pipeline) => <PipelineCard key={pipeline.id} pipeline={pipeline} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <GitBranch className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No pipelines found</h3>
                <p className="text-gray-400 mb-6">Create your first AI-powered pipeline to start processing data.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
