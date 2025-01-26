"use client"

import { useState } from "react"
import { useRouter,useParams, notFound } from "next/navigation"
import ProjectPageClient from "../../../components/projects/project-page-client"
import { useAuth } from "../../../contexts/auth-context"
import { LoadingOverlay } from "../../../components/ui/loading-overlay"
import { useProject } from "../../../hooks/use-project"

export default function ProjectGuidePage() {
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuth();
  const userId = user?.id as string;
  const { project, isLoading, error } = useProject(id);
  console.log(project)
  if (!userId) {
    return <LoadingOverlay />;
  }
//   if (error) {
//     return notFound();
//   }

  // Handle loading state
  if (isLoading) {
    return <LoadingOverlay />; // Show loading overlay while fetching data
  }

  // Handle problem not found state
  if (!project) {
    return <div className="container mx-auto px-4 py-8">Problem nott found</div>;
  }
  

  return <ProjectPageClient project={project}/>
  
}

