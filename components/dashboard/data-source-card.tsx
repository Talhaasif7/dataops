import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, RefreshCw, Settings } from "lucide-react"
import type { Tables } from "@/types/supabase"

interface DataSourceCardProps {
  dataSource: Tables<"data_sources">
}

export function DataSourceCard({ dataSource }: DataSourceCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-gray-400" />
            <CardTitle className="text-white">{dataSource.name}</CardTitle>
          </div>
          <Badge
            variant={
              dataSource.status === "connected"
                ? "default"
                : dataSource.status === "disconnected"
                  ? "outline"
                  : "destructive"
            }
            className={
              dataSource.status === "connected"
                ? "bg-green-600 hover:bg-green-700"
                : dataSource.status === "disconnected"
                  ? "text-gray-400"
                  : ""
            }
          >
            {dataSource.status}
          </Badge>
        </div>
        <CardDescription className="text-gray-400">{dataSource.type}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-400 mb-4">
          {dataSource.last_sync ? (
            <p>Last synced: {new Date(dataSource.last_sync).toLocaleString()}</p>
          ) : (
            <p>Not synced yet</p>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync
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
