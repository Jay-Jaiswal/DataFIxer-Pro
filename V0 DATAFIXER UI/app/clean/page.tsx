"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, AlertTriangle, Copy, Zap, FileCheck } from "lucide-react"
import { Header } from "@/components/header"
import { CleanlinessScore } from "@/components/cleanliness-score"
import { CleaningIssueCard } from "@/components/cleaning-issue-card"
import { FileUploader } from "@/components/file-uploader"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function CleanPage() {
  const [score] = useState(87)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const issues = [
    {
      title: "Missing Values",
      description: "Empty cells that need to be handled or imputed",
      icon: <AlertTriangle className="h-5 w-5" />,
      count: 12,
      color: "red" as const,
    },
    {
      title: "Duplicate Rows",
      description: "Exact or near-duplicate records in your dataset",
      icon: <Copy className="h-5 w-5" />,
      count: 5,
      color: "yellow" as const,
    },
    {
      title: "Outliers",
      description: "Statistical anomalies that may affect model training",
      icon: <Zap className="h-5 w-5" />,
      count: 3,
      color: "orange" as const,
    },
    {
      title: "Data Type Issues",
      description: "Incorrect column types that need standardization",
      icon: <FileCheck className="h-5 w-5" />,
      count: 2,
      color: "yellow" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 animate-slide-up">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <h1 className="mb-3 text-4xl font-bold text-foreground">Clean Your Dataset</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Upload raw datasets, automatically clean them, and visualize data quality improvements. Handle missing
            values, duplicates, outliers, and data type issues in one place.
          </p>
        </div>

        {/* Upload Dataset Section */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: "50ms" }}>
          <h2 className="text-2xl font-semibold text-foreground mb-6">Upload Dataset</h2>
          <FileUploader onFileSelect={setUploadedFile} />
        </div>

        {/* Data Cleaning Summary Section */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <h2 className="text-2xl font-semibold text-foreground mb-6">Data Cleaning Summary</h2>
          <CleanlinessScore score={score} />
        </div>

        {/* Feature Overview Section */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: "150ms" }}>
          <h2 className="text-2xl font-semibold text-foreground mb-6">Feature Overview</h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-3 text-left font-semibold text-foreground">Column Name</th>
                    <th className="px-6 py-3 text-left font-semibold text-foreground">Data Type</th>
                    <th className="px-6 py-3 text-left font-semibold text-foreground">Null Count</th>
                    <th className="px-6 py-3 text-left font-semibold text-foreground">Null %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { name: "user_id", type: "Integer", nullCount: 0, nullPercent: 0 },
                    { name: "age", type: "Integer", nullCount: 5, nullPercent: 2.3 },
                    { name: "income", type: "Float", nullCount: 12, nullPercent: 5.6 },
                    { name: "purchase_status", type: "String", nullCount: 3, nullPercent: 1.4 },
                    { name: "last_login", type: "DateTime", nullCount: 8, nullPercent: 3.7 },
                  ].map((col, idx) => (
                    <tr key={col.name} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-3 text-foreground font-medium">{col.name}</td>
                      <td className="px-6 py-3 text-muted-foreground">{col.type}</td>
                      <td className="px-6 py-3 text-muted-foreground">{col.nullCount}</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-muted rounded-full h-1.5">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${col.nullPercent * 5}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground min-w-10">{col.nullPercent}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Issues Found Section */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <h2 className="text-2xl font-semibold text-foreground mb-6">Issues Found</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {issues.map((issue, idx) => (
              <div key={issue.title} style={{ animationDelay: `${idx * 50}ms` }} className="animate-slide-up">
                <CleaningIssueCard {...issue} />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row animate-slide-up" style={{ animationDelay: "250ms" }}>
          <Button variant="outline" className="sm:flex-1 bg-transparent gap-2">
            <FileCheck className="h-4 w-4" />
            Generate Cleaning Report
          </Button>

          <Button variant="outline" className="sm:flex-1 bg-transparent gap-2">
            Download Cleaned CSV
          </Button>

          <Link href="/train" className="sm:flex-1">
            <Button className="w-full gap-2">
              Proceed to Model Training
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
