"use client"

import { useEffect, useRef } from 'react'
import * as monaco from 'monaco-editor'
import { useTheme } from 'next-themes'

interface MonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  theme?: string
}

export function MonacoEditor({ value, onChange, language, theme = 'vs-dark' }: MonacoEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const { theme: systemTheme } = useTheme()

  useEffect(() => {
    if (!editorRef.current) return

    // Create editor if it doesn't exist
    if (!editorInstanceRef.current) {
      editorInstanceRef.current = monaco.editor.create(editorRef.current, {
        value,
        language,
        theme: systemTheme === 'dark' ? 'vs-dark' : 'vs-light',
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: 'on',
        cursorStyle: 'line',
        cursorBlinking: 'blink',
        renderWhitespace: 'selection',
      })

      editorInstanceRef.current.onDidChangeModelContent(() => {
        onChange(editorInstanceRef.current?.getValue() || '')
      })
    }

    // Update value if it's different from editor content
    if (editorInstanceRef.current.getValue() !== value) {
      editorInstanceRef.current.setValue(value)
    }

    return () => {
      editorInstanceRef.current?.dispose()
      editorInstanceRef.current = null
    }
  }, []) // Empty dependency array to create editor only once

  // Handle theme changes
  useEffect(() => {
    if (editorInstanceRef.current) {
      monaco.editor.setTheme(systemTheme === 'dark' ? 'vs-dark' : 'vs-light')
    }
  }, [systemTheme])

  // Handle language changes
  useEffect(() => {
    if (editorInstanceRef.current) {
      const model = editorInstanceRef.current.getModel()
      if (model) {
        monaco.editor.setModelLanguage(model, language)
      }
    }
  }, [language,systemTheme])

  return <div ref={editorRef} className="h-full w-full" />
}