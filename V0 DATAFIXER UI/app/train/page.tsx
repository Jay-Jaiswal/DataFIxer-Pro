"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Header } from "@/components/header"
import { TrainingForm } from "@/components/training-form"
import { ModelResults } from "@/components/model-results"
import { Card } from "@/components/ui/card"

export default function TrainPage() {
  const [showResults, setShowResults] = useState(false)

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

          <h1 className="mb-3 text-4xl font-bold text-foreground">Train Your Model</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Configure machine learning parameters and train your model with automated optimization. Select your target
            column, choose an algorithm, and adjust hyperparameters to fit your needs.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-8">
          {/* Upload Cleaned Dataset Section */}
          {!showResults && (
            <>
              <Card className="p-8 border-2 border-dashed border-primary/30 bg-card/50 animate-slide-up">
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold text-foreground mb-2">Upload Cleaned Dataset</h2>
                  <p className="text-muted-foreground">Select your cleaned CSV or JSON file to begin training</p>
                </div>
                <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <input type="file" accept=".csv,.json" className="hidden" id="dataset-input" />
                  <label htmlFor="dataset-input" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-3">
                      <div className="text-3xl">📁</div>
                      <div>
                        <p className="font-semibold text-foreground">Drop your dataset here</p>
                        <p className="text-sm text-muted-foreground">or click to browse</p>
                      </div>
                    </div>
                  </label>
                </div>
              </Card>

              {/* Model Configuration Section */}
              <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
                <h2 className="text-2xl font-semibold text-foreground mb-6">Model Configuration</h2>
                <TrainingForm onTrain={() => setShowResults(true)} />
              </div>
            </>
          )}

          {/* Results Section */}
          {showResults && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Training Results</h2>
                <p className="text-muted-foreground">
                  View comprehensive metrics and visualizations from your trained model
                </p>
              </div>
              <ModelResults isVisible={showResults} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
