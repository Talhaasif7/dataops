import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitBranch, Play, Pause, Settings } from "lucide-react"
import type { Tables } from "@/types/supabase"

interface PipelineCardProps {
  pipeline: Tables<"pipelines">
}

export function PipelineCard({ pipeline }: PipelineCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GitBranch className="h-5 w-5 text-gray-400" />
            <CardTitle className="text-white">{pipeline.name}</CardTitle>
          </div>
          <Badge
            variant={
              pipeline.status === "active" ? "default" : pipeline.status === "inactive" ? "outline" : "destructive"
            }
            className={
              pipeline.status === "active"
                ? "bg-green-600 hover:bg-green-700"
                : pipeline.status === "inactive"
                  ? "text-gray-400"
                  : ""
            }
          >
            {pipeline.status}
          </Badge>
        </div>
        <CardDescription className="text-gray-400">{pipeline.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-400 mb-4">
          <p>Last run: {pipeline.last_run ? new Date(pipeline.last_run).toLocaleString() : "Never"}</p>
          <p>Next run: {pipeline.next_run ? new Date(pipeline.next_run).toLocaleString() : "Not scheduled"}</p>
          <p>Steps: {Array.isArray(pipeline.steps) ? pipeline.steps.length : 0}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            {pipeline.status === "active" ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
