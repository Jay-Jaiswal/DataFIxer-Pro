"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, FileText, Download, RotateCcw, BarChart3, TrendingUp } from "lucide-react"
import { Header } from "@/components/header"
import { ReportCard } from "@/components/report-card"
import { ReportsFilter } from "@/components/reports-filter"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ReportsPage() {
  const [filters, setFilters] = useState({
    search: "",
    type: "all" as const,
    status: "all" as const,
  })

  // Mock data with enhanced structure
  const allReports = [
    {
      id: "1",
      datasetName: "Q4 Sales Data",
      date: "Nov 3, 2024",
      accuracy: 94,
      status: "completed" as const,
      type: "training" as const,
      modelType: "Random Forest",
      f1Score: 0.92,
    },
    {
      id: "2",
      datasetName: "Customer Analytics",
      date: "Nov 2, 2024",
      accuracy: 87,
      status: "completed" as const,
      type: "training" as const,
      modelType: "Logistic Regression",
      f1Score: 0.85,
    },
    {
      id: "3",
      datasetName: "Product Inventory",
      date: "Nov 1, 2024",
      status: "completed" as const,
      type: "cleaning" as const,
      cleanlinessScore: 92,
    },
    {
      id: "4",
      datasetName: "Market Research",
      date: "Oct 31, 2024",
      accuracy: 91,
      status: "completed" as const,
      type: "training" as const,
      modelType: "XGBoost",
      f1Score: 0.89,
    },
    {
      id: "5",
      datasetName: "User Behavior",
      date: "Oct 30, 2024",
      status: "in-progress" as const,
      type: "cleaning" as const,
    },
    {
      id: "6",
      datasetName: "Financial Forecasting",
      date: "Oct 29, 2024",
      accuracy: 89,
      status: "completed" as const,
      type: "training" as const,
      modelType: "Linear Regression",
      f1Score: 0.87,
    },
  ]

  // Filter reports
  const filteredReports = useMemo(() => {
    return allReports.filter((report) => {
      if (filters.search && !report.datasetName.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }
      if (filters.type !== "all" && report.type !== filters.type) {
        return false
      }
      if (filters.status !== "all" && report.status !== filters.status) {
        return false
      }
      return true
    })
  }, [filters])

  const stats = [
    {
      label: "Total Reports",
      value: filteredReports.length,
      icon: <FileText className="h-5 w-5" />,
      color: "text-blue-600",
    },
    {
      label: "Completed",
      value: filteredReports.filter((r) => r.status === "completed").length,
      icon: <BarChart3 className="h-5 w-5" />,
      color: "text-green-600",
    },
    {
      label: "In Progress",
      value: filteredReports.filter((r) => r.status === "in-progress").length,
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 animate-slide-up">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <h1 className="mb-3 text-4xl font-bold text-foreground">Reports & Insights</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Access and manage all your data cleaning and model training reports. View detailed metrics, performance
            charts, and download comprehensive documentation.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="mb-12 grid gap-4 md:grid-cols-3 animate-slide-up" style={{ animationDelay: "50ms" }}>
          {stats.map((stat, idx) => (
            <Card key={stat.label} className="p-6 animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`${stat.color} opacity-20`}>{stat.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Search and Filters Section */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <ReportsFilter onFilterChange={setFilters} />
        </div>

        {/* Reports Grid Section */}
        {filteredReports.length > 0 ? (
          <>
            <div className="mb-8 animate-slide-up" style={{ animationDelay: "150ms" }}>
              <h2 className="text-xl font-semibold text-foreground mb-6">Your Reports</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredReports.map((report, idx) => (
                  <div key={report.id} className="animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
                    <ReportCard {...report} />
                  </div>
                ))}
              </div>
            </div>

            {/* Bulk Actions */}
            <Card className="p-6 bg-muted/50 border-border animate-slide-up" style={{ animationDelay: "200ms" }}>
              <h3 className="font-semibold text-foreground mb-4">Bulk Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Export All Reports
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <RotateCcw className="h-4 w-4" />
                  Refresh Reports
                </Button>
              </div>
            </Card>
          </>
        ) : (
          <Card
            className="p-12 text-center border-dashed bg-card/50 animate-slide-up"
            style={{ animationDelay: "150ms" }}
          >
            <div className="flex flex-col items-center gap-4">
              <FileText className="h-12 w-12 text-muted-foreground opacity-50" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No reports found</h3>
                <p className="text-muted-foreground max-w-md">
                  Try adjusting your filters or create a new report by uploading a dataset and training a model.
                </p>
              </div>
              <Link href="/upload" className="mt-4">
                <Button>Create Your First Report</Button>
              </Link>
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
