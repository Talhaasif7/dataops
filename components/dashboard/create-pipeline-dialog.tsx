"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus } from "lucide-react"
import { getClientInstance } from "@/lib/supabase"
import { useAuth } from "@/components/auth-provider"
import type { Tables } from "@/types/supabase"

interface CreatePipelineDialogProps {
  onAddPipeline: (pipeline: Partial<Tables<"pipelines">>) => void
}

export function CreatePipelineDialog({ onAddPipeline }: CreatePipelineDialogProps) {
  const { user } = useAuth()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("inactive")
  const [dataSources, setDataSources] = useState<Tables<"data_sources">[]>([])
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = getClientInstance()

  useEffect(() => {
    async function fetchDataSources() {
      if (!user) return

      const { data, error } = await supabase
        .from("data_sources")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "connected")

      if (!error && data) {
        setDataSources(data)
      }
    }

    if (open) {
      fetchDataSources()
    }
  }, [open, user, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const defaultSteps = [
      {
        id: "step1",
        name: "Extract Data",
        type: "extract",
        config: {
          query: "SELECT * FROM source_table",
        },
      },
      {
        id: "step2",
        name: "Transform Data",
        type: "transform",
        config: {
          operations: ["clean_data", "validate_schema"],
        },
        dependsOn: ["step1"],
      },
      {
        id: "step3",
        name: "Load Data",
        type: "load",
        config: {
          destination: "target_table",
          mode: "append",
        },
        dependsOn: ["step2"],
      },
    ]

    const newPipeline = {
      name,
      description,
      status: status as "active" | "inactive",
      steps: defaultSteps,
      next_run: status === "active" ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : null,
    }

    try {
      await onAddPipeline(newPipeline)
      setOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error adding pipeline:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setName("")
    setDescription("")
    setStatus("inactive")
    setSelectedDataSources([])
  }

  const handleDataSourceToggle = (dataSourceId: string) => {
    setSelectedDataSources((prev) =>
      prev.includes(dataSourceId) ? prev.filter((id) => id !== dataSourceId) : [...prev, dataSourceId],
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Pipeline
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Create Pipeline</DialogTitle>
          <DialogDescription className="text-gray-400">
            Create a new data pipeline to process and transform your data.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Pipeline Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="e.g., Customer Data ETL"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="Describe what this pipeline does..."
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Initial Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {dataSources.length > 0 && (
              <div className="grid gap-2">
                <Label>Data Sources</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {dataSources.map((dataSource) => (
                    <div key={dataSource.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={dataSource.id}
                        checked={selectedDataSources.includes(dataSource.id)}
                        onCheckedChange={() => handleDataSourceToggle(dataSource.id)}
                      />
                      <Label htmlFor={dataSource.id} className="text-sm">
                        {dataSource.name} ({dataSource.type})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Pipeline"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
