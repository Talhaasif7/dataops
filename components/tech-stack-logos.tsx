"use client"

export function TechStackLogos() {
  const logos = [
    { name: "Apache Airflow", logo: "🌊" },
    { name: "dbt", logo: "🔧" },
    { name: "Prefect", logo: "⚡" },
    { name: "Snowflake", logo: "❄️" },
    { name: "BigQuery", logo: "📊" },
    { name: "Databricks", logo: "🧱" },
    { name: "AWS", logo: "☁️" },
    { name: "Kubernetes", logo: "⚙️" },
  ]

  return (
    <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-60">
      {logos.map((item, index) => (
        <div key={index} className="flex items-center space-x-2 text-gray-400 hover:text-gray-300 transition-colors">
          <span className="text-2xl">{item.logo}</span>
          <span className="text-sm font-medium hidden sm:block">{item.name}</span>
        </div>
      ))}
    </div>
  )
}
