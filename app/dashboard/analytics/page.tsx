"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Activity, Database, GitBranch } from "lucide-react"
import { getClientInstance } from "@/lib/supabase"
import { useAuth } from "@/components/auth-provider"
import type { Tables } from "@/types/supabase"

export default function AnalyticsPage() {
  const { user } = useAuth()
  const [pipelines, setPipelines] = useState<Tables<"pipelines">[]>([])
  const [dataSources, setDataSources] = useState<Tables<"data_sources">[]>([])
  const [pipelineRuns, setPipelineRuns] = useState<Tables<"pipeline_runs">[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = getClientInstance()

  useEffect(() => {
    async function fetchAnalyticsData() {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        // Fetch pipelines
        const { data: pipelinesData, error: pipelinesError } = await supabase
          .from("pipelines")
          .select("*")
          .eq("user_id", user.id)

        if (pipelinesError) {
          console.error("Error fetching pipelines:", pipelinesError)
          setError("Failed to load analytics data")
        } else {
          setPipelines(pipelinesData || [])
        }

        // Fetch data sources
        const { data: dataSourcesData, error: dataSourcesError } = await supabase
          .from("data_sources")
          .select("*")
          .eq("user_id", user.id)

        if (dataSourcesError) {
          console.error("Error fetching data sources:", dataSourcesError)
          setError("Failed to load analytics data")
        } else {
          setDataSources(dataSourcesData || [])
        }

        // Fetch pipeline runs
        const { data: runsData, error: runsError } = await supabase
          .from("pipeline_runs")
          .select(`
            *,
            pipelines!inner(user_id)
          `)
          .eq("pipelines.user_id", user.id)
          .order("started_at", { ascending: false })
          .limit(100)

        if (runsError) {
          console.error("Error fetching pipeline runs:", runsError)
          // Don't set error for pipeline runs as it's not critical
        } else {
          setPipelineRuns(runsData || [])
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error)
        setError("Failed to load analytics data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [user, supabase])

  const successfulRuns = pipelineRuns.filter((run) => run.status === "success").length
  const failedRuns = pipelineRuns.filter((run) => run.status === "failed").length
  const successRate = pipelineRuns.length > 0 ? (successfulRuns / pipelineRuns.length) * 100 : 0

  const activePipelines = pipelines.filter((p) => p.status === "active").length
  const connectedSources = dataSources.filter((ds) => ds.status === "connected").length

  const recentRuns = pipelineRuns.slice(0, 10)

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Analytics</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Pipeline Runs</CardTitle>
            <Activity className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{pipelineRuns.length}</div>
            <p className="text-xs text-gray-400 mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{successRate.toFixed(1)}%</div>
            <p className="text-xs text-green-400 mt-1">+2.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Pipelines</CardTitle>
            <GitBranch className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{activePipelines}</div>
            <p className="text-xs text-gray-400 mt-1">of {pipelines.length} total</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Connected Sources</CardTitle>
            <Database className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{connectedSources}</div>
            <p className="text-xs text-gray-400 mt-1">of {dataSources.length} total</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="data-quality">Data Quality</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Pipeline Status Distribution</CardTitle>
                <CardDescription className="text-gray-400">Current status of all pipelines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Active</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-700 rounded-full">
                        <div
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${pipelines.length > 0 ? (activePipelines / pipelines.length) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-sm text-white">{activePipelines}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Inactive</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-700 rounded-full">
                        <div
                          className="h-2 bg-gray-500 rounded-full"
                          style={{
                            width: `${pipelines.length > 0 ? ((pipelines.length - activePipelines) / pipelines.length) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-white">{pipelines.length - activePipelines}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Pipeline Runs</CardTitle>
                <CardDescription className="text-gray-400">Latest pipeline execution results</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-gray-400">Loading recent runs...</p>
                ) : recentRuns.length > 0 ? (
                  <div className="space-y-3">
                    {recentRuns.slice(0, 5).map((run) => (
                      <div key={run.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              run.status === "success"
                                ? "bg-green-500"
                                : run.status === "failed"
                                  ? "bg-red-500"
                                  : "bg-yellow-500"
                            }`}
                          />
                          <span className="text-sm text-gray-300">Pipeline Run</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400">{new Date(run.started_at).toLocaleDateString()}</div>
                          <div
                            className={`text-xs ${
                              run.status === "success"
                                ? "text-green-400"
                                : run.status === "failed"
                                  ? "text-red-400"
                                  : "text-yellow-400"
                            }`}
                          >
                            {run.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No recent runs found</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Performance Metrics</CardTitle>
              <CardDescription className="text-gray-400">Pipeline execution performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{successfulRuns}</div>
                  <div className="text-sm text-green-400">Successful Runs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{failedRuns}</div>
                  <div className="text-sm text-red-400">Failed Runs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {pipelineRuns.length - successfulRuns - failedRuns}
                  </div>
                  <div className="text-sm text-yellow-400">Running</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data-quality" className="space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Data Source Health</CardTitle>
              <CardDescription className="text-gray-400">Status of connected data sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dataSources.map((source) => (
                  <div key={source.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          source.status === "connected"
                            ? "bg-green-500"
                            : source.status === "disconnected"
                              ? "bg-gray-500"
                              : "bg-red-500"
                        }`}
                      />
                      <span className="text-sm text-gray-300">{source.name}</span>
                      <span className="text-xs text-gray-500">({source.type})</span>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-xs ${
                          source.status === "connected"
                            ? "text-green-400"
                            : source.status === "disconnected"
                              ? "text-gray-400"
                              : "text-red-400"
                        }`}
                      >
                        {source.status}
                      </div>
                      {source.last_sync && (
                        <div className="text-xs text-gray-500">{new Date(source.last_sync).toLocaleDateString()}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
