"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { InviteTeamMemberDialog } from "@/components/dashboard/invite-team-member-dialog"
import { getClientInstance } from "@/lib/supabase"
import { useAuth } from "@/components/auth-provider"
import { Users, UserPlus, Mail, Shield, Clock } from "lucide-react"
import type { Tables } from "@/types/supabase"

type TeamMember = Tables<"users"> & {
  pending?: boolean
  invitedAt?: string
}

export default function TeamPage() {
  const { user } = useAuth()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [pendingInvites, setPendingInvites] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = getClientInstance()

  useEffect(() => {
    async function fetchTeamMembers() {
      if (!user) return

      try {
        setIsLoading(true)

        // Fetch team members
        const { data: members, error } = await supabase
          .from("users")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Error fetching team members:", error)
        } else {
          setTeamMembers(members || [])
        }

        // For demo purposes, let's create some mock pending invites
        // In a real app, you would fetch these from a separate "invites" table
        setPendingInvites([
          {
            id: "pending-1",
            email: "pending1@example.com",
            name: "Pending User 1",
            role: "user",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            pending: true,
            invitedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          },
          {
            id: "pending-2",
            email: "pending2@example.com",
            name: "Pending User 2",
            role: "engineer",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            pending: true,
            invitedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
          },
        ])
      } catch (error) {
        console.error("Error fetching team data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeamMembers()
  }, [user, supabase])

  const handleInviteTeamMember = async (email: string, role: string) => {
    // In a real app, you would send an invitation email and store the invite in the database
    // For demo purposes, we'll just add it to the pending invites list
    const newInvite: TeamMember = {
      id: `pending-${Date.now()}`,
      email,
      name: email.split("@")[0],
      role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      pending: true,
      invitedAt: new Date().toISOString(),
    }

    setPendingInvites([newInvite, ...pendingInvites])
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-600 hover:bg-red-700">Admin</Badge>
      case "engineer":
        return <Badge className="bg-blue-600 hover:bg-blue-700">Engineer</Badge>
      default:
        return <Badge className="bg-gray-600 hover:bg-gray-700">User</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Team Management</h1>
          <p className="text-gray-400 mt-1">Manage your team members and their access</p>
        </div>
        <InviteTeamMemberDialog onInvite={handleInviteTeamMember} />
      </div>

      {/* Team Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Members</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{teamMembers.length}</div>
            <p className="text-xs text-gray-400 mt-1">Active team members</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Pending Invites</CardTitle>
            <UserPlus className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{pendingInvites.length}</div>
            <p className="text-xs text-gray-400 mt-1">Awaiting acceptance</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Admin Users</CardTitle>
            <Shield className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {teamMembers.filter((member) => member.role === "admin").length}
            </div>
            <p className="text-xs text-gray-400 mt-1">With full access</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Team Members */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Active Team Members</CardTitle>
          <CardDescription className="text-gray-400">Users who can access your DataOps platform</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-700 animate-pulse" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-1/4" />
                    <div className="h-3 bg-gray-700 rounded animate-pulse w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-850 hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://avatar.vercel.sh/${member.email}`} alt={member.name} />
                      <AvatarFallback>{member.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-white">{member.name}</div>
                      <div className="text-sm text-gray-400 flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {member.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getRoleBadge(member.role)}
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-400">No team members found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pending Invites */}
      {pendingInvites.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Pending Invites</CardTitle>
            <CardDescription className="text-gray-400">
              Users who have been invited but haven't joined yet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-850 hover:bg-gray-700 transition-colors border border-dashed border-gray-700"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10 opacity-50">
                      <AvatarImage src={`https://avatar.vercel.sh/${invite.email}`} alt={invite.name} />
                      <AvatarFallback>{invite.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-300">{invite.email}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Invited {formatTimeAgo(invite.invitedAt || "")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getRoleBadge(invite.role)}
                    <Button variant="outline" size="sm" className="text-gray-400 hover:text-white">
                      Resend
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
  } else if (diffMins > 0) {
    return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`
  } else {
    return "just now"
  }
}
