"use client"

interface PreviewPanelProps {
  html: string | null
  error: string | null
  isExecuting: boolean
}

export function PreviewPanel({ html, error, isExecuting }: PreviewPanelProps) {
  if (isExecuting) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="animate-pulse">Executing code...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
        <h3 className="font-semibold text-destructive mb-2">Error:</h3>
        <pre className="whitespace-pre-wrap text-sm text-destructive/90">{error}</pre>
      </div>
    )
  }

  if (!html) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Click &quot;Run Code&quot; to see the preview
      </div>
    )
  }

  return (
    <div className="preview-container rounded-md bg-background border p-4">
      <div 
        className="h-full overflow-auto"
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    </div>
  )
}