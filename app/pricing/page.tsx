import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
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
              <Link href="/platform" className="text-gray-300 hover:text-white transition-colors">
                Platform
              </Link>
              <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Products</span>
              <Link href="/pricing" className="text-blue-400">
                Pricing
              </Link>
            </nav>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              Get for free
            </Button>
          </div>
        </div>
      </header>

      {/* Pricing Hero */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Simple, <span className="text-blue-400">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Choose the plan that fits your team's needs. All plans include our core features with no hidden fees.
          </p>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Starter</CardTitle>
                <CardDescription className="text-gray-300">Perfect for small teams</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">$99</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Up to 10 data sources
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />5 team members
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Basic monitoring
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Start free trial
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-blue-500 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">Most Popular</Badge>
              <CardHeader>
                <CardTitle className="text-white text-xl">Professional</CardTitle>
                <CardDescription className="text-gray-300">For growing teams</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">$299</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Unlimited data sources
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    25 team members
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Advanced monitoring
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Start free trial</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-xl">Enterprise</CardTitle>
                <CardDescription className="text-gray-300">For large organizations</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">Custom</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Everything in Professional
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Unlimited team members
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3" />
                    Dedicated support
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Contact sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
