"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export function TestimonialCarousel() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Head of Data Engineering",
      company: "TechCorp",
      avatar: "SC",
      content:
        "DataOps AI reduced our pipeline development time from weeks to hours. The AI-generated code is production-ready and follows best practices.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior Data Engineer",
      company: "DataFlow Inc",
      avatar: "MR",
      content:
        "The natural language interface is game-changing. I can describe complex transformations and get optimized dbt models instantly.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "VP of Analytics",
      company: "ScaleUp",
      avatar: "EW",
      content:
        "Our team productivity increased 10x. The AI suggestions for data quality checks caught issues we would have missed.",
      rating: 5,
    },
  ]

  return (
    <section className="bg-gray-900 py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gray-800 text-gray-300">Customer Stories</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Loved by Data Teams
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-teal-500/50 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={`https://avatar.vercel.sh/${testimonial.name}`} />
                    <AvatarFallback className="bg-teal-600 text-white">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
