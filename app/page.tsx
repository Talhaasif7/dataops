import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Database,
  Zap,
  Shield,
  BarChart3,
  Users,
  ChevronRight,
  Play,
  Star,
  CheckCircle,
  Brain,
  Code,
  GitBranch,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { HeroBackground } from "@/components/hero-background"
import { MobileNav } from "@/components/mobile-nav"
import { TechStackLogos } from "@/components/tech-stack-logos"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { PricingSection } from "@/components/pricing-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top utility bar */}
      <div className="border-b border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex h-10 items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-teal-500 text-teal-400 bg-teal-500/10">
                <Sparkles className="w-3 h-3 mr-1" />
                New: AI Pipeline Builder 2.0
              </Badge>
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6">
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                Login
              </Link>
              <span className="hidden sm:block text-gray-300 hover:text-white transition-colors cursor-pointer">
                Developer Hub
              </span>
              <span className="hidden sm:block text-gray-300 hover:text-white transition-colors cursor-pointer">
                Contact Us
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <div className="text-xl sm:text-2xl font-bold">
                <span className="text-white">Data</span>
                <span className="text-teal-400">Ops</span>
              </div>
              <Badge variant="outline" className="hidden md:block border-teal-500 text-teal-400 text-xs">
                AI-Powered
              </Badge>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link href="/platform" className="text-gray-300 hover:text-white transition-colors font-medium">
                Platform
              </Link>
              <span className="text-gray-300 hover:text-white transition-colors font-medium cursor-pointer">
                Solutions
              </span>
              <span className="text-gray-300 hover:text-white transition-colors font-medium cursor-pointer">
                Developers
              </span>
              <span className="text-gray-300 hover:text-white transition-colors font-medium cursor-pointer">
                Resources
              </span>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors font-medium">
                Pricing
              </Link>
            </nav>

            {/* CTA and mobile menu */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
                >
                  Start Free
                </Button>
              </Link>
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative overflow-hidden bg-gray-950 py-16 sm:py-20 md:py-24 lg:py-32">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <HeroBackground />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-gray-950" />

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            {/* Announcement badge */}
            <div className="inline-flex items-center rounded-full border border-gray-700 bg-gray-800/50 px-4 py-2 text-sm mb-8">
              <Star className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-gray-300">Trusted by 500+ data teams worldwide</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Build Data Pipelines
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                with AI Intelligence
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your data engineering with AI-powered automation. Generate production-ready pipelines for
              <span className="text-teal-400 font-semibold"> Airflow, dbt, and Prefect </span>
              from natural language descriptions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16">
              <Link href="/login">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-teal-500/25"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Start Building with AI
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:text-teal-400 transition-colors" />
                Watch 3-min Demo
              </Button>
            </div>

            {/* Social proof stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  10x
                </div>
                <div className="text-sm sm:text-base text-gray-400">Faster Pipeline Development</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  99.9%
                </div>
                <div className="text-sm sm:text-base text-gray-400">Uptime SLA</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  500+
                </div>
                <div className="text-sm sm:text-base text-gray-400">Enterprise Customers</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  50TB+
                </div>
                <div className="text-sm sm:text-base text-gray-400">Data Processed Daily</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-12 sm:py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm sm:text-base mb-6">Trusted by data teams using</p>
            <TechStackLogos />
          </div>
        </div>
      </section>

      {/* AI-powered section */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-green-600/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.1),transparent_70%)]" />

        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-teal-500/20 text-teal-400 border-teal-500/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by Advanced AI
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              From Idea to Production
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                in Minutes, Not Months
              </span>
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              "Transform customer data monthly for analytics dashboard" → AI generates optimized Airflow DAG, dbt
              models, and data quality checks automatically.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 font-semibold">
                  <Brain className="w-5 h-5 mr-2" />
                  Try AI Pipeline Builder
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10"
              >
                View Live Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="bg-gray-950 py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-800 text-gray-300">Platform Features</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need for
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Modern Data Engineering
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              AI-driven platform built for scale, security, and developer productivity
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-teal-500/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">AI-Assisted Pipeline Creation</CardTitle>
                <CardDescription className="text-gray-300">
                  Describe your data transformation in natural language. AI generates optimized pipeline code for
                  Airflow, dbt, and Prefect.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-purple-500/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Multi-Framework Support</CardTitle>
                <CardDescription className="text-gray-300">
                  Generate production-ready code for Apache Airflow, dbt, Prefect, and more. Switch between frameworks
                  seamlessly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-green-500/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Data Quality Assurance</CardTitle>
                <CardDescription className="text-gray-300">
                  AI suggests and implements data validation checks, anomaly detection, and quality monitoring
                  automatically.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-orange-500/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GitBranch className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Version Control & CI/CD</CardTitle>
                <CardDescription className="text-gray-300">
                  Built-in Git integration with automated testing, deployment pipelines, and rollback capabilities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Real-time Monitoring</CardTitle>
                <CardDescription className="text-gray-300">
                  Comprehensive observability with data lineage tracking, performance metrics, and intelligent alerting.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-pink-500/50 transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Team Collaboration</CardTitle>
                <CardDescription className="text-gray-300">
                  Role-based access control, shared workspaces, and automated documentation for seamless team
                  collaboration.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="bg-gray-900 py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-teal-500/20 text-teal-400 border-teal-500/30">How It Works</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              From Natural Language to
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Production Pipeline
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI understands your requirements and generates optimized, production-ready code
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "1",
                title: "Connect & Describe",
                description: "Connect your data sources and describe your transformation needs in plain English",
                icon: Database,
                color: "from-teal-500 to-emerald-500",
              },
              {
                step: "2",
                title: "AI Analyzes",
                description: "Our AI analyzes your data schema and requirements to design the optimal pipeline",
                icon: Brain,
                color: "from-purple-500 to-pink-500",
              },
              {
                step: "3",
                title: "Code Generation",
                description: "Generate production-ready code for Airflow, dbt, or Prefect with quality checks",
                icon: Code,
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "4",
                title: "Deploy & Monitor",
                description: "Automated deployment with CI/CD and real-time monitoring with intelligent alerts",
                icon: Zap,
                color: "from-orange-500 to-red-500",
              },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-800 border-2 border-gray-700 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* Pricing */}
      <PricingSection />

      {/* CTA section */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />

        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your
              <br />
              Data Engineering?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join thousands of data teams who trust DataOps AI to accelerate their data infrastructure and reduce
              time-to-insight.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Start Building with AI
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
              >
                Schedule AI Demo
              </Button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-white/80">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Setup in 5 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold">
                  <span className="text-white">Data</span>
                  <span className="text-teal-400">Ops</span>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                The AI-powered data engineering platform that transforms how teams build, deploy, and manage data
                pipelines.
              </p>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="border-teal-500 text-teal-400">
                  <Star className="w-3 h-3 mr-1" />
                  4.9/5 on G2
                </Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-400">
                  SOC 2 Compliant
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">AI Pipeline Builder</span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">Multi-Framework Support</span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">Data Quality Checks</span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">CI/CD Integration</span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">Real-time Monitoring</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Solutions</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">Data Engineering</span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">MLOps</span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">Analytics</span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">Data Governance</span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">Enterprise</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">About Us</span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">Careers</span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">Blog</span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">Contact</span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">Support</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} DataOps. All rights reserved.</p>
            <div className="flex flex-wrap justify-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                Terms of Service
              </span>
              <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">Security</span>
              <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">Status</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
