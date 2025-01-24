"use client"

import * as React from "react"
import { Moon, Sun, Leaf, Sparkles, Flame } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {currentTheme === "light" && <Sun className="h-[1.2rem] w-[1.2rem]" />}
          {currentTheme === "dark" && <Moon className="h-[1.2rem] w-[1.2rem]" />}
          {currentTheme === "forest" && <Leaf className="h-[1.2rem] w-[1.2rem]" />}
          {currentTheme === "royal" && <Sparkles className="h-[1.2rem] w-[1.2rem]" />}
          {currentTheme === "sepia" && <Flame className="h-[1.2rem] w-[1.2rem]" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("forest")}>
          <Leaf className="mr-2 h-4 w-4" />
          Forest
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("royal")}>
          <Sparkles className="mr-2 h-4 w-4" />
          Royal
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("sepia")}>
          <Flame className="mr-2 h-4 w-4" />
          Warm
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Sun className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}