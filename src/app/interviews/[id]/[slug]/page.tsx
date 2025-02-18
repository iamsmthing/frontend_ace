"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTheme } from "next-themes";
import Split from "react-split";
import {
  ChevronLeft,
  Code2,
  FileText,
  Settings,
  Terminal,
  Check,
  Play,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Description } from "@/components/interviews/description";
import { Editor } from "@monaco-editor/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ProblemDescription } from "@/components/practice/problem-description";

interface Challenge {
  title: string;
  difficulty: string;
  initialCode: string;
}
const languages = {
  cpp: `#include <iostream>
  
  int main() {
      std::cout << "Hello, World!" << std::endl;
      return 0;
  }`,
  javascript: `function greet(name) {
    console.log(\`Hello, \${name}!\`);
  }
  
  greet('World');`,
  python: `def greet(name):
      print(f"Hello, {name}!")
  
  greet("World")`,
  java: `public class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello, World!");
      }
  }`,
};

const challenges: { [key: string]: Challenge } = {
  debounce: {
    title: "Debounce",
    difficulty: "Medium",
    initialCode: `/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
export default function debounce(func, wait) {
  throw 'Not implemented!';
}`,
  },
  // Add other challenges here
};

export default function ChallengePage() {
  const params = useParams();
  const challenge = challenges[params.slug as string];

  const [language, setLanguage] = useState<keyof typeof languages>("cpp");
  const [code, setCode] = useState(languages[language]);
  const [theme, setTheme] = useState<"vs-dark" | "light" | "dracula">(
    "vs-dark"
  );

  const handleLanguageChange = (newLanguage: keyof typeof languages) => {
    setLanguage(newLanguage);
    setCode(languages[newLanguage]);
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      window.dispatchEvent(new Event("resize"));
    });
    resizeObserver.observe(document.body);
    return () => resizeObserver.disconnect();
  }, []);

  if (!challenge) {
    return <div>Challenge not found</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden ">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-purple-500/20  px-4 py-2 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <Link
              href="/interviews"
              className="flex items-center gap-2 rounded-lg px-2 py-1 "
            >
              <ChevronLeft className="h-5 w-5" />
              Back to Challenges
            </Link>
            <div className="h-6 w-px " />
            <h1 className="text-lg font-semibold ">
              {challenge.title}
            </h1>
            <Badge className=" ">
              {challenge.difficulty}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className=""
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </header>
        <div className="flex-1 overflow-hidden">
          <div className="h-[calc(100vh-3.5rem)]">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={35}>
                <div className="flex h-full flex-col overflow-hidden">
                  <div className="flex items-center gap-4 border-b border-purple-500/20  px-4 py-2">
                    <Button variant="ghost" className="">
                      <FileText className="mr-2 h-4 w-4" />
                      Description
                    </Button>
                    <Button variant="ghost" className="">
                      <Terminal className="mr-2 h-4 w-4" />
                      Test Cases
                    </Button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6">
                    <Description challenge={challenge} />
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={65}>
                <div className="flex h-full flex-col overflow-hidden">
                  <div className="flex items-center justify-between gap-4 border-b border-purple-500/20 bg-white/5 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Select
                        value={language}
                        onValueChange={(value: keyof typeof languages) =>
                          handleLanguageChange(value)
                        }
                      >
                        <SelectTrigger className="w-[140px] border-purple-500/20 ">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="border-purple-500/20bg-slate-800 text-purple-50">
                          <SelectItem value="cpp">C++</SelectItem>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="java">Java</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={theme}
                        onValueChange={(
                          value: "vs-dark" | "light" | "dracula"
                        ) => setTheme(value)}
                      >
                        <SelectTrigger className="w-[140px] border-purple-500/20 ">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent className="border-purple-500/20 ">
                          <SelectItem value="vs-dark">Dark</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dracula">Dracula</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-500/20   "
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Run Tests
                      </Button>
                      <Button
                        size="sm"
                        className=" "
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Submit
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <Editor
                      value={code}
                      onChange={(value) => setCode(value!)}
                      theme={theme}
                      language={language}
                    />
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
