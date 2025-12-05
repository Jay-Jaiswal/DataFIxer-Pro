"use client"

import { Upload, Zap, Brain, BarChart3 } from "lucide-react"
import { Header } from "@/components/header"
import { DashboardCard } from "@/components/dashboard-card"

export default function Home() {
  const cards = [
    {
      title: "Upload Dataset",
      description: "Drag and drop CSV or JSON files to get started with data cleaning.",
      icon: <Upload className="h-6 w-6" />,
      href: "#upload",
    },
    {
      title: "Clean Data",
      description: "Handle missing values, duplicates, outliers, and data type issues.",
      icon: <Zap className="h-6 w-6" />,
      href: "#clean",
    },
    {
      title: "Train Model",
      description: "Build and train ML models with customizable parameters and algorithms.",
      icon: <Brain className="h-6 w-6" />,
      href: "#train",
    },
    {
      title: "View Reports",
      description: "Access detailed metrics, visualizations, and model performance reports.",
      icon: <BarChart3 className="h-6 w-6" />,
      href: "#reports",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-16 animate-slide-up">
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">Welcome to DataFixer AI Studio</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Upload, clean, and train your data effortlessly. A professional pipeline for data science, designed for
            beginners and experts alike.
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, idx) => (
            <div key={card.title} style={{ animationDelay: `${idx * 75}ms` }}>
              <DashboardCard title={card.title} description={card.description} icon={card.icon} href={card.href} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
