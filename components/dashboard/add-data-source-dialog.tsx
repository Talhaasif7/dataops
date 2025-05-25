"use client"

import type React from "react"

import { useState } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import type { Tables } from "@/types/supabase"

interface AddDataSourceDialogProps {
  onAddDataSource: (dataSource: Partial<Tables<"data_sources">>) => void
}

export function AddDataSourceDialog({ onAddDataSource }: AddDataSourceDialogProps) {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [host, setHost] = useState("")
  const [port, setPort] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [database, setDatabase] = useState("")
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const newDataSource = {
      name,
      type,
      status: "connected" as const,
      last_sync: new Date().toISOString(),
      credentials: {
        host,
        port,
        username,
        password,
        database,
      },
    }

    try {
      await onAddDataSource(newDataSource)
      setOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error adding data source:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setName("")
    setType("")
    setHost("")
    setPort("")
    setUsername("")
    setPassword("")
    setDatabase("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Data Source
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <DialogTitle>Add Data Source</DialogTitle>
          <DialogDescription className="text-gray-400">
            Connect to a new data source to start building pipelines.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800 border-gray-700"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select database type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="postgresql">PostgreSQL</SelectItem>
                  <SelectItem value="mysql">MySQL</SelectItem>
                  <SelectItem value="mongodb">MongoDB</SelectItem>
                  <SelectItem value="snowflake">Snowflake</SelectItem>
                  <SelectItem value="bigquery">BigQuery</SelectItem>
                  <SelectItem value="redshift">Redshift</SelectItem>
                  <SelectItem value="s3">S3</SelectItem>
                  <SelectItem value="redis">Redis</SelectItem>
                  <SelectItem value="kafka">Kafka</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="host">Host</Label>
              <Input
                id="host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="bg-gray-800 border-gray-700"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="port">Port</Label>
                <Input
                  id="port"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="database">Database</Label>
                <Input
                  id="database"
                  value={database}
                  onChange={(e) => setDatabase(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-800 border-gray-700"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Connecting..." : "Connect"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
