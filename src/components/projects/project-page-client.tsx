"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Checkbox } from "../../components/ui/checkbox";
import { Progress } from "../../components/ui/progress";
import { Project } from "../../lib/types/project";
import { ArrowLeft, Github, Globe } from "lucide-react";

interface ProjectClientProps {
  project: Project;
}

const ProjectPageClient = ({ project }: ProjectClientProps) => {
  const router = useRouter();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const totalSteps = project?.guide?.sections.reduce(
    (count, section) => count + section.steps.length,
    0
  );
  const progress = totalSteps ? (completedSteps.length / totalSteps) * 100 : 0;

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{project?.title}</h1>
            <Badge
              variant="secondary"
              className={
                project?.type === "frontend"
                  ? "bg-blue-100 text-blue-800"
                  : project?.type === "backend"
                  ? "bg-green-100 text-green-800"
                  : "bg-purple-100 text-purple-800"
              }
            >
              {project?.type}
            </Badge>
          </div>

          <p className="text-lg text-muted-foreground mb-6">
            {project?.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project?.techStack?.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-8">
            {project?.githubUrl && (
              <Button variant="outline" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
            {project?.liveUrl && (
              <Button variant="outline" asChild>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>

          <Card className="p-4 mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Progress</h3>
              <span className="text-sm text-muted-foreground">
                {completedSteps.length} of {totalSteps} steps completed
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </Card>
        </div>

        <div className="space-y-8">
          {project?.guide?.sections?.map((section, index) => (
            <div key={section.id} className="space-y-4">
              <h2 className="text-2xl font-bold">
                {index + 1}. {section.title}
              </h2>
              <p className="text-muted-foreground">{section.description}</p>

              <div className="space-y-4">
                {section.steps.map((step) => (
                  <Card key={step.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id={step.id}
                        checked={completedSteps.includes(step.id)}
                        onCheckedChange={() => toggleStep(step.id)}
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={step.id}
                          className="text-lg font-medium cursor-pointer"
                        >
                          {step.title}
                        </label>
                        <p className="text-muted-foreground mt-1">
                          {step.description}
                        </p>
                        {step.code && (
                          <pre className="mt-4 p-4 bg-muted rounded-lg overflow-x-auto">
                            <code>{step.code}</code>
                          </pre>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPageClient;
