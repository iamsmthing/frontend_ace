"use client";

import { useState, useEffect } from 'react';
import { Project} from '@/lib/types/project';
import { getChallenge } from '@/lib/api/challenges';
import { getProject } from '@/lib/api/projects';

export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null|number>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        setIsLoading(true);
        const data = await getProject(id);
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch problem'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  return { project, isLoading, error };
}