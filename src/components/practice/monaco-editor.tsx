"use client"

import { useState, useEffect } from "react"
import Editor, { loader } from "@monaco-editor/react"

// Define the available themes
type EditorTheme = "vs-dark" | "light" | "dracula"

interface CodeEditorProps {
  value: string
  onChange: (value: string | undefined) => void
  theme?: EditorTheme
  language?: string
}

export default function CodeEditor({ value, onChange, theme = "vs-dark", language = "cpp" }: CodeEditorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    loader.init().then((monaco) => {
      // Define the Dracula theme
      monaco.editor.defineTheme("dracula", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "comment", foreground: "6272a4" },
          { token: "string", foreground: "f1fa8c" },
          { token: "keyword", foreground: "ff79c6" },
          { token: "number", foreground: "bd93f9" },
          { token: "operator", foreground: "ff79c6" },
          { token: "function", foreground: "50fa7b" },
          { token: "variable", foreground: "f8f8f2" },
          { token: "type", foreground: "8be9fd" },
        ],
        colors: {
          "editor.background": "#282a36",
          "editor.foreground": "#f8f8f2",
          "editorCursor.foreground": "#f8f8f2",
          "editor.lineHighlightBackground": "#44475a",
          "editorLineNumber.foreground": "#6272a4",
          "editor.selectionBackground": "#44475a",
          "editor.inactiveSelectionBackground": "#44475a75",
        },
      })

      // Load additional language support
      import("monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution")
      import("monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution")
      import("monaco-editor/esm/vs/basic-languages/python/python.contribution")
      import("monaco-editor/esm/vs/basic-languages/java/java.contribution")
    })
  }, [])

  if (!mounted) return null

  return (
    <Editor
      height="calc(100vh - 73px)"
      defaultLanguage={language}
      language={language}
      theme={theme}
      value={value}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        automaticLayout: true,
        lineNumbersMinChars: 2,
        padding: { top: 10 },
      }}
    />
  )
}

