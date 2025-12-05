"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { FileUploader } from "@/components/file-uploader"
import { DataPreviewTable } from "@/components/data-preview-table"
import { Button } from "@/components/ui/button"

export default function UploadPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <h1 className="mb-2 text-3xl font-bold text-foreground">Upload Dataset</h1>
          <p className="text-muted-foreground">
            Start by uploading your CSV or JSON file to begin the data cleaning and analysis process.
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-12">
          <FileUploader onFileSelect={setUploadedFile} />
        </div>

        {/* Data Preview */}
        {uploadedFile && (
          <>
            <div className="mb-8">
              <DataPreviewTable file={uploadedFile} />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setUploadedFile(null)}>
                Upload Different File
              </Button>

              <Link href="/clean">
                <Button className="gap-2">
                  Proceed to Cleaning
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
