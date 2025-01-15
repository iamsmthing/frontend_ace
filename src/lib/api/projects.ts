"use client";
import { Project } from "@/lib/types/project";

export async function getProject(id: string): Promise<Project> {
  const response = await fetch(`/api/api/project/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch problem');
  }
  console.log(response)
  return response.json();
}
