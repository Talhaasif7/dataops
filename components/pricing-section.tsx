"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, Crown, Building } from "lucide-react"
import Link from "next/link"

export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started",
      price: "$99",
      period: "/month",
      icon: Zap,
      features: [
        "Up to 10 data sources",
        "5 team members",
        "AI pipeline generation",
        "Basic monitoring",
        "Community support",
        "dbt & Airflow support",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      description: "For growing teams with advanced needs",
      price: "$299",
      period: "/month",
      icon: Crown,
      features: [
        "Unlimited data sources",
        "25 team members",
        "Advanced AI features",
        "Real-time monitoring",
        "Priority support",
        "All framework support",
        "Data quality automation",
        "Custom integrations",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations at scale",
      price: "Custom",
      period: "",
      icon: Building,
      features: [
        "Everything in Professional",
        "Unlimited team members",
        "Dedicated support",
        "SLA guarantees",
        "On-premise deployment",
        "Advanced security",
        "Custom AI models",
        "White-label options",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section className="bg-gray-950 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-teal-500/20 text-teal-400 border-teal-500/30">Pricing</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the plan that fits your team's needs. All plans include our core AI features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-teal-500/50 transition-all duration-300 ${
                plan.popular ? "ring-2 ring-teal-500/50 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <plan.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <Check className="h-5 w-5 text-teal-400 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.name === "Enterprise" ? "/contact" : "/signup"}>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">All plans include:</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <Check className="w-4 h-4 text-teal-400 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-teal-400 mr-2" />
              No setup fees
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 text-teal-400 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
