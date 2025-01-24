"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { CodeEditor } from "@/components/practice/code-editor"
import { ProblemDescription } from "@/components/practice/problem-description"
import type { Problem } from "@/lib/types/problem"
import { useEffect, useState } from "react";
interface PracticeProblemClientProps {
  problem: Problem
}

export function PracticeProblemClient({ problem }: PracticeProblemClientProps) {
    const [clientSide, setClientSide] = useState(false);
    useEffect(() => {
        setClientSide(true); // Set to true after the component is mounted on the client
      }, []);
    
      if (!clientSide) {
        return <div>Loading...</div>; // Render this on the server-side or during the initial load
      }

  return (
    <div className="h-[calc(100vh-3.5rem)]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30}>
          <ProblemDescription problem={problem} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <CodeEditor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}