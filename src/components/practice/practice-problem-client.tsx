"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../../components/ui/resizable"
import { CodeEditor } from "../../components/practice/code-editor"
import { ProblemDescription } from "../../components/practice/problem-description"
import type { Problem } from "../../lib/types/problem"
import { useEffect, useState } from "react";
interface PracticeProblemClientProps {
  problem: Problem
}

const sandboxEnv = [
  {
    name: "React",
    iframe:
      `https://codesandbox.io/embed/t3lfsp?view=editor+%2B+preview&module=%2Fsrc%2FApp.tsx`,
  },
  {
    name: "Angular",
    iframe: `https://stackblitz.com/edit/stackblitz-starters-vzkwjymz?embed=1&file=src%2Fmain.ts`,
  },
  {
    name: "Next",
    iframe:
      `https://stackblitz.com/edit/stackblitz-starters-ankvjv6k?embed=1&file=app%2Fpage.tsx`,
  },
  {
    name: "Vue",
    iframe:`https://codesandbox.io/p/devbox/s898vp?embed=1`
  },
];

export function PracticeProblemClient({ problem }: PracticeProblemClientProps) {
    const [clientSide, setClientSide] = useState(false);
    useEffect(() => {
        setClientSide(true); // Set to true after the component is mounted on the client
      }, []);
    
      if (!clientSide) {
        return <div>Loading...</div>; // Render this on the server-side or during the initial load
      }

      const iframe = sandboxEnv.find((env) => env.name === problem.category)?.iframe || '';
  return (
    <div className="h-[calc(100vh-3.5rem)]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30}>
          <ProblemDescription problem={problem} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <CodeEditor iframe={iframe}/>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}