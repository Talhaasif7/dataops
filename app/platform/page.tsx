import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code, GitBranch, Monitor } from "lucide-react"
import Link from "next/link"

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header - reuse from main page */}
      <div className="border-b border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-end space-x-6 text-sm">
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Developer Hub</span>
            <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Contact Us</span>
          </div>
        </div>
      </div>

      <header className="border-b border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-white">Dataops</span>
                <span className="text-blue-400">.live</span>
              </div>
            </Link>
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/platform" className="text-blue-400">
                Platform
              </Link>
              <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Products</span>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
            </nav>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              Get for free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The Complete Data Engineering <span className="text-blue-400">Platform</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Build, deploy, and manage enterprise-grade data pipelines with our comprehensive platform designed for
              modern data teams.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Start building today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Platform Capabilities</h2>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Visual Pipeline Builder</CardTitle>
                <CardDescription className="text-gray-300">
                  Design complex data workflows with our intuitive drag-and-drop interface.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <GitBranch className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Version Control</CardTitle>
                <CardDescription className="text-gray-300">
                  Built-in Git integration with branching, merging, and deployment workflows.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Monitor className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Real-time Monitoring</CardTitle>
                <CardDescription className="text-gray-300">
                  Comprehensive monitoring and alerting for all your data pipelines.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
