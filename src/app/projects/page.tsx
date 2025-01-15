"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProjectCard } from "@/components/projects/project-card"
import { projectsData } from "@/lib/projects-data"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, TrendingUp } from "lucide-react"

export default function ProjectsPage() {
  const [search, setSearch] = useState("")
  const [selectedStack, setSelectedStack] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("trending")

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase())
    const matchesStack = selectedStack === "all" || project.techStack.includes(selectedStack)
    const matchesType = selectedType === "all" || project.type === selectedType
    return matchesSearch && matchesStack && matchesType
  })

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Project Ideas</h1>
          <p className="text-muted-foreground text-lg">
            Build real-world projects to enhance your portfolio
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="md:w-[300px]"
            />
            <Select value={selectedStack} onValueChange={setSelectedStack}>
              <SelectTrigger className="md:w-[200px]">
                <SelectValue placeholder="Tech Stack" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stacks</SelectItem>
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="Next.js">Next.js</SelectItem>
                <SelectItem value="Vue">Vue</SelectItem>
                <SelectItem value="Node.js">Node.js</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
                <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="md:w-[200px]">
                <SelectValue placeholder="Project Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="fullstack">Full Stack</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant={sortBy === "trending" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("trending")}
              className="gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Trending
            </Button>
            <Button
              variant={sortBy === "newest" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("newest")}
              className="gap-2"
            >
              <Clock className="h-4 w-4" />
              Newest
            </Button>
            <Button
              variant={sortBy === "learning" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("learning")}
              className="gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Learning Path
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}