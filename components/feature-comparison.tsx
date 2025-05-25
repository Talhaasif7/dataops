import { Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function FeatureComparison() {
  const features = [
    { name: "Visual Pipeline Builder", starter: true, professional: true, enterprise: true },
    { name: "Data Source Connectors", starter: "10", professional: "50+", enterprise: "Unlimited" },
    { name: "Team Members", starter: "5", professional: "25", enterprise: "Unlimited" },
    { name: "AI Assistant", starter: false, professional: true, enterprise: true },
    { name: "Version Control", starter: true, professional: true, enterprise: true },
    { name: "Automated Testing", starter: false, professional: true, enterprise: true },
    { name: "Custom Integrations", starter: false, professional: "Limited", enterprise: true },
    { name: "Dedicated Support", starter: false, professional: false, enterprise: true },
    { name: "SLA Guarantee", starter: false, professional: "99.9%", enterprise: "99.99%" },
    { name: "On-premise Deployment", starter: false, professional: false, enterprise: true },
  ]

  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden">
      <CardHeader className="pb-0">
        <CardTitle className="text-white text-xl">Feature Comparison</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-2 text-gray-300 font-medium">Feature</th>
                <th className="text-center py-4 px-2 text-gray-300 font-medium">Starter</th>
                <th className="text-center py-4 px-2 text-gray-300 font-medium">Professional</th>
                <th className="text-center py-4 px-2 text-gray-300 font-medium">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className={index < features.length - 1 ? "border-b border-gray-700" : ""}>
                  <td className="py-4 px-2 text-white">{feature.name}</td>
                  <td className="py-4 px-2 text-center">
                    {typeof feature.starter === "boolean" ? (
                      feature.starter ? (
                        <Check className="h-5 w-5 text-green-400 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-300">{feature.starter}</span>
                    )}
                  </td>
                  <td className="py-4 px-2 text-center">
                    {typeof feature.professional === "boolean" ? (
                      feature.professional ? (
                        <Check className="h-5 w-5 text-green-400 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-300">{feature.professional}</span>
                    )}
                  </td>
                  <td className="py-4 px-2 text-center">
                    {typeof feature.enterprise === "boolean" ? (
                      feature.enterprise ? (
                        <Check className="h-5 w-5 text-green-400 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-300">{feature.enterprise}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
