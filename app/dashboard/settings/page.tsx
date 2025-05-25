"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <Card className="max-w-2xl mx-auto bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Profile</h2>
              <p className="text-gray-400 text-sm mb-4">Update your personal information and preferences.</p>
              {/* Add profile form fields here */}
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Security</h2>
              <p className="text-gray-400 text-sm mb-4">Change your password or enable two-factor authentication.</p>
              {/* Add security settings here */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
