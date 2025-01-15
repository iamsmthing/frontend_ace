"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Project } from "@/lib/types/project"
import { ArrowRight, Github } from "lucide-react"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">{project.title}</h3>
        <Badge 
          variant="secondary"
          className={
            project.type === "frontend" ? "bg-blue-100 text-blue-800" :
            project.type === "backend" ? "bg-green-100 text-green-800" :
            "bg-purple-100 text-purple-800"
          }
        >
          {project.type}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {project.description}
      </p>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm">
          <span className="text-muted-foreground">Difficulty:</span>{" "}
          <span className={
            project.difficulty === "Beginner" ? "text-green-600" :
            project.difficulty === "Intermediate" ? "text-yellow-600" :
            "text-red-600"
          }>
            {project.difficulty}
          </span>
        </div>
        <div className="flex gap-2">
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-1" />
                Code
              </a>
            </Button>
          )}
          <Button size="sm" asChild>
            <a href={`/projects/${project.id}`}>
              Start Project
              <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  )
}